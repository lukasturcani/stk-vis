export interface IPropertySubquery
{
    [keyName: string]: { '$in': string[] }
}


export interface IPropertyQuery
{
    '$or': IPropertySubquery[];
}
