import { Db } from 'mongodb';
mport { ISortedValues } from '../types';


export interface Options
{
    moleculeKey: string;
}


export function getSortedValues(
    options: Options,
    database: Db,
)
    : Promise<ISortedValues>
{
    return Promise.resolve({
        keys: [],
        values: [],
    });
}
