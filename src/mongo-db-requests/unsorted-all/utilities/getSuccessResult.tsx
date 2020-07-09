import { IStageTwoResult } from './stage-two';
import { ISuccess, ResultKind } from '../IResult';


export function getSuccessResult([
    pageKind,
    valueCollections,
    molecules,
]: IStageTwoResult)
    : ISuccess
{
    return {
        kind: ResultKind.Success,
        molecules,
        pageKind,
        valueCollections,
    };
}
