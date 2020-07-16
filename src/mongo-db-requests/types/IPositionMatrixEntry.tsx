import { IPositionMatrix } from './molecular';


export interface IPositionMatrixEntry
{
    m: IPositionMatrix;
    [prop: string]: string | IPositionMatrix;
}
