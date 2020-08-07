module RequestManager.RequestManager.Internal.Reducer.Internal.InitializeSortedBuildingBlocks
    ( initializeSortedBuildingBlocks
    ) where

import RequestManager.InitializeSortedBuildingBlocks as Payload

import RequestManager.RequestManager.Internal.RequestManager
    ( RequestManager (SortedBuildingBlocks)
    ) as RequestManager

import RequestManager.RequestManager.Internal.RequestManager.SortedBuildingBlocks
    as SortedBuildingBlocks

initializeSortedBuildingBlocks
    :: RequestManager.RequestManager
    -> Payload.InitializeSortedBuildingBlocks
    -> RequestManager.RequestManager

initializeSortedBuildingBlocks _ payload
    = RequestManager.SortedBuildingBlocks sortedBuildingBlocks
  where
    sortedBuildingBlocks
        = SortedBuildingBlocks.SortedBuildingBlocks
            { _url: Payload.url payload
            , _database: Payload.database payload
            , _moleculeKey: Payload.moleculeKey payload
            , _moleculeCollection: Payload.moleculeCollection payload
            , _constructedMoleculeCollection:
                Payload.constructedMoleculeCollection payload

            , _positionMatrixCollection:
                Payload.positionMatrixCollection payload

            , _pageIndex: Payload.pageIndex payload
            , _numEntriesPerPage: Payload.numEntriesPerPage payload
            , _ignoredCollections: Payload.ignoredCollections payload
            , _pageKind: Payload.pageKind payload
            , _sortedCollection: Payload.sortedCollection payload
            , _sortType: Payload.sortType payload
            , _columns: Payload.columns payload
            }
