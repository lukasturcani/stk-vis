import { createAction } from '@reduxjs/toolkit'
import {
    UnsortedSearchKind
} from '../../../models';


export interface IMongoDbFields
{
    url: string;
    moleculeKey: string;
    database: string;
    moleculeCollection: string;
    positionMatrixCollection: string;
    constructedMoleculeCollection: string;
    buildingBlockPositionMatrixCollection: string;
    numEntriesPerPage: number;
    searchKind: UnsortedSearchKind;
}


export const updateMongoDbFields = createAction(
    'DatabaseBrowser/updateMongoDbFields',
    (fields: IMongoDbFields) => {
        return {
            payload: fields,
        };
    },
);
