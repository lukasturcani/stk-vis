import { createAction } from '@reduxjs/toolkit'


export interface IMongoDbFields
{
    url: string;
    database: string;
    moleculeCollection: string;
    positionMatrixCollection: string;
}


export const updateMongoDbFields = createAction(
    'DatabaseBrowser/updateMongoDbFields',
    (fields: IMongoDbFields) => {
        return {
            payload: fields,
        };
    },
);
