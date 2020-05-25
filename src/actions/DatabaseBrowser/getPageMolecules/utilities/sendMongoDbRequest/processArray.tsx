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
import { updateTable } from '../../../../../actions';
import {
    processArrayInterface,
    processArrayOptions,
} from './interfaces';



export const processArray: processArrayInterface =
    (options: processArrayOptions) =>
    (err: MongoError, items: IDbEntry[]) =>
{
    const data: IDatabaseData
        = getDatabaseData(items);

    const query: IPropertyQuery
        = getPropertyQuery(data);

    const propertyPromises: Promise<any>[]
        = options.propertyCollections.map(
            getPropertyPromise(options.client)(options.database)(query)
        )

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

        options.dispatch(updateTable({
            molecules: data.molecules,
            columnValues: data.columnValues,
            pageIndex: options.pageIndex,
        }));
        options.cursor.close();
        options.client.close();
    });
}
