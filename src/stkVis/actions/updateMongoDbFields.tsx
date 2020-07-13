import { createAction } from '@reduxjs/toolkit'


export const enum SearchKind
{
    UnsortedBoth = "Unsorted Both",
    UnsortedBuildingBlocks = "Unsorted Building Blocks",
    UnsortedConstructedMolecules = "Unsorted Constructed Molecules",
}


export interface Payload
{
    url: string;
    moleculeKey: string;
    database: string;
    moleculeCollection: string;
    positionMatrixCollection: string;
    constructedMoleculeCollection: string;
    buildingBlockPositionMatrixCollection: string;
    numEntriesPerPage: number;
    searchKind: SearchKind;
}


export const updateMongoDbFields = createAction(
    'DatabaseBrowser/updateMongoDbFields',
    (payload: Payload) => ({ payload }),
);
