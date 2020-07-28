import { Result } from 'Requests.UnsortedAll';


export const enum ResultKind
{
    Success = 'Success',
    DatabaseConnectionError = 'Database Connection Error',
    CollectionConnectionError = 'Collection Connection Error',
    UncategorizedError = 'Uncategorized Error',

}


export interface ISuccess
{
    kind: ResultKind.Success;
    result: Result;

}

export interface IDatabaseConnectionError
{
    kind: ResultKind.DatabaseConnectionError;
}


export interface ICollectionConnectionError
{
    kind: ResultKind.CollectionConnectionError;
}


export interface IUncategorizedError
{
    kind: ResultKind.UncategorizedError;
}



export type IResult =
    | ISuccess
    | IDatabaseConnectionError
    | ICollectionConnectionError
    | IUncategorizedError
