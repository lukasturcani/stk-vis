declare module 'Requests.UnsortedAll'
{
    export type Result = Record<string, unknown>;

    export interface RequestOptions
    {
        url: string;
        database: string;
        moleculeKey: string;
        moleculeCollection: string;
        positionMatrixCollection: string;
        buildingBlockPositionMatrixCollection: string;
        pageIndex: number;
        numEntriesPerPage: number;
        ignoredCollections: string[];
    }

    export const request: (options: RequestOptions) => Promise<Result>;

}
