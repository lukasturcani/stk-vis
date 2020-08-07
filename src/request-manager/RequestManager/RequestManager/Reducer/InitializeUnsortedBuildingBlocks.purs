module RequestManager.RequestManager.Internal.Reducer.Internal.InitializeUnsortedBuildingBlocks
    ( initializeUnsortedBuildingBlocks
    ) where

import RequestManager.InitializeUnsortedBuildingBlocks as Payload

import RequestManager.RequestManager.Internal.RequestManager
    ( RequestManager (UnsortedBuildingBlocks)
    ) as RequestManager

import RequestManager.RequestManager.Internal.RequestManager.UnsortedBuildingBlocks
    as UnsortedBuildingBlocks

initializeUnsortedBuildingBlocks
    :: RequestManager.RequestManager
    -> Payload.InitializeUnsortedBuildingBlocks
    -> RequestManager.RequestManager

initializeUnsortedBuildingBlocks _ payload
    = RequestManager.UnsortedBuildingBlocks unsortedBuildingBlocks
  where
    unsortedBuildingBlocks
        = UnsortedBuildingBlocks.UnsortedBuildingBlocks
            { _url: (Payload.url payload)
            , _database: (Payload.database payload)
            , _moleculeKey: (Payload.moleculeKey payload)
            , _moleculeCollection: (Payload.moleculeCollection payload)
            , _constructedMoleculeCollection:
                (Payload.constructedMoleculeCollection payload)

            , _positionMatrixCollection:
                (Payload.positionMatrixCollection payload)

            , _pageIndex: (Payload.pageIndex payload)
            , _numEntriesPerPage: (Payload.numEntriesPerPage payload)
            , _ignoredCollections: (Payload.ignoredCollections payload)
            , _pageKind: (Payload.pageKind payload)
            , _columns: Payload.columns payload
            }
