import { IDbEntry } from '../IDbEntry';
import { MongoError } from 'mongodb';
import { getDatabaseData, IDatabaseData } from '../getDatabaseData';
import { getPropertyQuery, IPropertyQuery } from '../getPropertyQuery';
import {
    assertNever,
    getPropertyPromise,
    getMoleculeId,
} from '../utilities';
import {
    updateTable,
    setMoleculeRequestState,
} from '../../../../../actions';
import {
    PageKind,
    MoleculeRequestStateKind,
} from '../../../../../models';
import {
    processArrayInterface,
    processArrayOptions,
} from './interfaces';
import {
    extractPropertyData,
    IPropertyResults,
} from '../utilities';




export const processArray: processArrayInterface =
    (options: processArrayOptions) =>
    (err: MongoError, items: IDbEntry[]) =>
{
    if (items.length === 0)
    {
        options.dispatch(
            setMoleculeRequestState(
                MoleculeRequestStateKind.RequestSucceeded
            )
        );
        options.successSnackbar('There are no new molecules!');
        return;
    }

    const isFirstPage: boolean
        = options.pageIndex === 0;

    const isLastPage: boolean
        // The requests number of items should be numEntriesPerPage+1.
        = items.length <= options.numEntriesPerPage;

    const isIncomplete: boolean
        = items.length < options.numEntriesPerPage;

    let pageKind: PageKind
        = PageKind.First;

    if (isFirstPage && isLastPage && isIncomplete)
    {
        pageKind = PageKind.OnlyIncomplete;
    }
    else if (isFirstPage && isLastPage && !isIncomplete)
    {
        pageKind = PageKind.OnlyComplete;
    }
    else if (isFirstPage && !isLastPage)
    {
        pageKind = PageKind.First;
    }
    else if (!isFirstPage && isLastPage && isIncomplete)
    {
        pageKind = PageKind.LastIncomplete;
    }
    else if (!isFirstPage && isLastPage && !isIncomplete)
    {
        pageKind = PageKind.LastComplete;
    }
    else if (!isFirstPage && !isLastPage)
    {
        pageKind = PageKind.Middle;
    }

    const data: IDatabaseData
        = getDatabaseData(items.slice(0, options.numEntriesPerPage));

    const query: IPropertyQuery
        = getPropertyQuery(data);

    const propertyPromises: Promise<IPropertyResults>[]
        = options.propertyCollections.map(
            getPropertyPromise
            (options.client)(options.database)(query)
        ).map(promise => promise.then(extractPropertyData(data)));

    Promise.all(propertyPromises).then(
        (properties: IPropertyResults[]) =>
        {
            options.dispatch(updateTable({
                molecules: data.molecules,
                columnValues: data.columnValues,
                pageIndex: options.pageIndex,
                pageKind,
            }));
            options.cursor.close();
            options.client.close();
        }
    );
}
