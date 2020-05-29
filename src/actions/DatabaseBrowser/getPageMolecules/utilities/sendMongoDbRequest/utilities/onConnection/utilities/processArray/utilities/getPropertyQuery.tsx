import { IDatabaseData } from './getDatabaseData';


export interface IPropertySubquery
{
    [keyName: string]: { '$in': string[] }
}


export interface IPropertyQuery
{
    '$or': IPropertySubquery[];
}



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
