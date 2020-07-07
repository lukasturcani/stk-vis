import { createAction } from '@reduxjs/toolkit'
import {
    IMoleculeSelectionType,
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
    moleculeSelectionType: IMoleculeSelectionType;
}


export const updateMongoDbFields = createAction(
    'DatabaseBrowser/updateMongoDbFields',
    (fields: IMongoDbFields) => {
        return {
            payload: fields,
        };
    },
);
