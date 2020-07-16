declare module 'StkVis.StkVis'
{
    import { IAction } from 'StkVis.Action';

    export type IStkVis  = Record<string, unknown>;

    export interface IProps
    {
        kind: string;
        url: string;
        moleculeKey: string;
        database: string;
        moleculeCollection: string;
        constructedMoleculeCollection: string;
        positionMatrixCollection: string;
        buildingBlockPositionMatrixCollection: string;
        numEntriesPerPage: number;
        selectBuildingBlocks: boolean;
        selectConstructedMolecules: boolean;
    }

    export const initialState: IStkVis;

    export const reducer:
        (state: IStkVis) => (action: IAction) => IStkVis;

    export const props:
        (state: IStkVis) => IProps;
}
