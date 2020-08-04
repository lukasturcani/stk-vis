declare module 'RequestManager.InitializeUnsortedConstructedMolecules'
{
    import { PageKind } from 'RequestManager.PageKind';


    export type InitializeUnsortedConstructedMolecules
        = Record<string, unknown>;

    export interface UnsortedConstructedMoleculesData
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
    }

    export const initializeUnsortedConstructedMolecules:
        (data: UnsortedConstructedMoleculesData) =>
        InitializeUnsortedConstructedMolecules;
}
