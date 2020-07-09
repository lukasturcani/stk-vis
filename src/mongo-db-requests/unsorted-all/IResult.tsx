import { IMolecule, PageKind } from '../types';


export const enum ResultKind
{
    Success = 'Success',
    DatabaseConnectionError = 'Database Connection Error',
    CollectionRequestError = 'CollectionRequestError',

}


export interface ISuccess
{
    kind: ResultKind.Success;
    molecules: IMolecule[];
    pageKind: PageKind;
    valueCollections: string[];
}

export interface IDatabaseConnectionError
{
    kind: ResultKind.DatabaseConnectionError;
}


export interface ICollectionRequestError
{
    kind: ResultKind.CollectionRequestError;
}




export type IResult =
    | ISuccess
    | IDatabaseConnectionError
    | ICollectionRequestError
