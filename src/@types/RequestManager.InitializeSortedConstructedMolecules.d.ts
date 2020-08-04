declare module 'RequestManager.InitializeSortedConstructedMolecules'
{
    import { PageKind } from 'RequestManager.PageKind';
    import { SortType } from 'RequestManager.SortType';


    export type InitializeSortedConstructedMolecules
        = Record<string, unknown>;

    export interface SortedConstructedMoleculesData
    {
        url: string;
        database: string;
        moleculeKey: string;
        moleculeCollection: string;
        constructedMoleculeCollection: string;
        positionMatrixCollection: string;
        pageIndex: number;
        numEntriesPerPage: number;
        ignoredCollections: string[];
        pageKind: PageKind;
        sortedCollection: string;
        sortType: SortType;
    }

    export const initializeSortedConstructedMolecules:
        (data: SortedConstructedMoleculesData) =>
        InitializeSortedConstructedMolecules;
}
