import { createAction } from '@reduxjs/toolkit'


interface IAtom
{
    atomicNumber: number;
}


interface IBond
{
    atom1Id: number;
    atom2Id: number;
    order: number;
}


type number3 = [number, number, number];


interface IMolecule
{
    columnValues: Map<string, string>;
    atoms: IAtom[];
    bonds: IBond[];
    positionMatrix: number3[];
}


const enum PageKind
{
    First = 'First',
    Middle = 'Middle',
    LastComplete = 'Last Complete',
    LastIncomplete = 'Last Incomplete',
    OnlyComplete = 'Only Complete',
    OnlyIncomplete = 'Only Incomplete',
}


export interface Payload
{
    molecules: IMolecule[];
    pageKind: PageKind;
    valueCollections: string[];
    pageIndex: number;
}


export const updateTable = createAction(
    'DatabaseBrowser/updateTable',
    (payload: Payload) => ({ payload }),
);
