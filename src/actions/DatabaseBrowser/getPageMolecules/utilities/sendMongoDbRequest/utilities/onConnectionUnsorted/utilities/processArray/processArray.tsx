import { AnyAction } from '@reduxjs/toolkit';
import { MongoError, MongoClient, Cursor } from 'mongodb';
import {
    updateTable,
    setMoleculeRequestState,
} from '../../../../../../../../../actions';
import {
    MaybeKind,
    Maybe,
} from '../../../../../../../../../utilities';
import {
    PageKind,
    MoleculeRequestStateKind,
} from '../../../../../../../../../models';
import { IPageData } from '../../../IPageData';
import {
    getPageKind,
    IDbEntry,
    getDatabaseData,
    IDatabaseData,
    getPropertyQuery,
    IPropertyQuery,
    extractPropertyData,
    getPropertyPromise,
    IPropertyResults,
    addPositionMatrices,
} from './utilities';



interface processArrayOptions
{
    database: string;
    moleculeCollection: string;
    positionMatrixCollection: string;
    propertyCollections: string[];
    dispatch: (action: AnyAction) => void;
    numEntriesPerPage: number;
    pageIndex: number;
    currentPageData: Maybe<IPageData>;
    successSnackbar: (message: string) => void;
    errorSnackbar: (message: string) => void;
    client: MongoClient;
    cursor: Cursor;
}


function assertNever(arg: never): never { throw Error(); }


interface processArrayInterface
{
    (options: processArrayOptions):
    (err: MongoError, item: IDbEntry[]) => void
}

export const processArray: processArrayInterface =
    (options: processArrayOptions) =>
    (err: MongoError, items: IDbEntry[]) =>
{
    if (err !== null)
    {
        options.dispatch(
            setMoleculeRequestState(
                MoleculeRequestStateKind.RequestFailed
            )
        );
        options.errorSnackbar('Could not find entries in database.');
        return;
    }

    if (items.length === 0)
    {
        options.dispatch(
            setMoleculeRequestState(
                MoleculeRequestStateKind.RequestSucceeded
            )
        );
        options.successSnackbar('Did not find any molecules!');
        return;
    }

    const pageKind: PageKind
        = getPageKind({
            numItems: items.length,
            pageIndex: options.pageIndex,
            numEntriesPerPage: options.numEntriesPerPage,
        });

    const data: IDatabaseData
        = getDatabaseData(items.slice(0, options.numEntriesPerPage));

    const query: IPropertyQuery
        = getPropertyQuery(data);

    const propertyPromises: Promise<Maybe<IPropertyResults>>[]
        = options.propertyCollections.map(
            getPropertyPromise({...options, query})
        ).map(promise => promise.then(extractPropertyData(data)));

    const positionMatricesPromise: Promise<Maybe<IPropertyResults>>
        = getPropertyPromise
            ({...options, query})(options.positionMatrixCollection)

    Promise.all([
            positionMatricesPromise,
        ...propertyPromises,
    ]).then(
        (properties: Maybe<IPropertyResults>[]) =>
        {

            addPositionMatrices(data, properties[0]);

            options.dispatch(updateTable({
                molecules: data.molecules,
                columnValues: data.columnValues,
                pageIndex: options.pageIndex,
                pageKind,
                propertyCollections: options.propertyCollections,
            }));
            options.cursor.close();
            options.client.close();

            switch (options.currentPageData.kind)
            {
                case MaybeKind.Nothing:
                    break;

                case MaybeKind.Just:
                    const noNewMolecules: boolean
                        = (
                            data.molecules.length
                            <=
                            options.currentPageData.value.numMolecules
                        );

                    const isSamePage: boolean
                        = (
                            options.pageIndex
                            ===
                            options.currentPageData.value.pageIndex
                        );

                    const isIncomplete: boolean
                        = (
                            pageKind === PageKind.OnlyIncomplete
                            ||
                            pageKind === PageKind.LastIncomplete
                        );

                    if (isSamePage && noNewMolecules && isIncomplete)
                    {
                        options.successSnackbar(
                            'There are no new molecules!'
                        );
                    }
                    break;

                default:
                    assertNever(options.currentPageData);

            }
        }
    );
}
