import { IDatabaseData } from './IDatabaseData';
import { IPropertySubquery, IPropertyQuery } from './IPropertyQuery';


export function getPropertyQuery(data: IDatabaseData): IPropertyQuery
{
    const subqueries: IPropertySubquery[]
        = [];

    for (const moleculeKeyName of data.moleculeKeyNames)
    {
        const subquery: IPropertySubquery
            = {
                [moleculeKeyName]: {
                    '$in': Object.values(
                        data.columnValues[moleculeKeyName]
                    ),
                },
            };
        subqueries.push(subquery);
    }

    return {
        '$or': subqueries,
    }
}
