import { IDbEntry } from '../IDbEntry';
import { MongoError } from 'mongodb';
import { getDatabaseData, IDatabaseData } from '../getDatabaseData';
import { getPropertyQuery, IPropertyQuery } from '../getPropertyQuery';
import {
    assertNever,
    getPropertyPromise,
    getMoleculeId
} from '../utilities';
import { Maybe, MaybeKind } from '../../../../../utilities';
import { updateTable, setLastPage } from '../../../../../actions';
import { PageKind } from '../../../../../models';
import {
    processArrayInterface,
    processArrayOptions,
} from './interfaces';



export const processArray: processArrayInterface =
    (options: processArrayOptions) =>
    (err: MongoError, items: IDbEntry[]) =>
{
    if (items.length === 0)
    {
        options.dispatch(setLastPage());
        return;
    }

    const data: IDatabaseData
        = getDatabaseData(items);

    const query: IPropertyQuery
        = getPropertyQuery(data);

    const propertyPromises: Promise<any>[]
        = options.propertyCollections.map(
            getPropertyPromise(options.client)(options.database)(query)
        )

    // Here instead of waiting for all the properties to finish,
    // I should probably immediately extract data from each
    // Promise as soon as its done, and then wait on all Promises
    // returned by that. There is no reason to wait for all promises
    // to finish, before extracting their data is started.
    Promise.all(propertyPromises).then(properties => {

        for (
            let i = 0; i < options.propertyCollections.length; ++i
        ) {
            const collectionName: string
                = options.propertyCollections[i];

            const propertyValues
                = properties[i];

            data.columnValues[collectionName] = {};

            for (let value of propertyValues)
            {
                const moleculeId: Maybe<number>
                    = getMoleculeId(data.moleculeIds, value);

                switch(moleculeId.kind)
                {
                    case MaybeKind.Just:
                        data.columnValues
                        [collectionName]
                        [moleculeId.value]
                            = value['v'];
                        break;

                    case MaybeKind.Nothing:

                        throw Error(
                            'No molecule id was found. This ' +
                            'should never happen.'
                        );
                        break;

                    default:
                        assertNever(moleculeId);

                }

            }

        }

        const isFirstPage: boolean
            = options.pageIndex === 0;

        const isLastPage: boolean
            = items.length < options.numEntriesPerPage;

        let pageKind: PageKind
            = PageKind.Last;

        if (isFirstPage && isLastPage)
        {
            pageKind = PageKind.Only;
        }
        if (isFirstPage && !isLastPage)
        {
            pageKind = PageKind.First;
        }
        if (!isFirstPage && isLastPage)
        {
            pageKind = PageKind.Last;
        }
        if (!isFirstPage && !isLastPage)
        {
            pageKind = PageKind.Middle;
        }

        options.dispatch(updateTable({
            molecules: data.molecules,
            columnValues: data.columnValues,
            pageIndex: options.pageIndex,
            pageKind,
        }));
        options.cursor.close();
        options.client.close();
    });
}
