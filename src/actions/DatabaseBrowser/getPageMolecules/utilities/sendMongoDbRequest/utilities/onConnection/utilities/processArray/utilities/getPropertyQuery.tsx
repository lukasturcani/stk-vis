import { IDatabaseData } from './IDatabaseData';
import { IPropertySubquery, IPropertyQuery } from './IPropertyQuery';


export function getPropertyQuery(data: IDatabaseData): IPropertyQuery
{
    const subqueries: IPropertySubquery[]
        = [];

    for (let moleculeKeyName of data.moleculeKeyNames)
    {
        let subquery: IPropertySubquery
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
