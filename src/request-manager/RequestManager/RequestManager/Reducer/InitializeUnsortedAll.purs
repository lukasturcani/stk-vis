module RequestManager.RequestManager.Internal.Reducer.Internal.InitializeUnsortedAll
    ( initializeUnsortedAll
    ) where

import RequestManager.InitializeUnsortedAll as Payload

import RequestManager.RequestManager.Internal.RequestManager
    ( RequestManager (UnsortedAll)
    ) as RequestManager

import RequestManager.RequestManager.Internal.RequestManager.UnsortedAll
    as UnsortedAll

initializeUnsortedAll
    :: RequestManager.RequestManager
    -> Payload.InitializeUnsortedAll
    -> RequestManager.RequestManager

initializeUnsortedAll _ payload
    = RequestManager.UnsortedAll unsortedAll
  where
    unsortedAll = UnsortedAll.UnsortedAll
        { _url: (Payload.url payload)
        , _database: (Payload.database payload)
        , _moleculeKey: (Payload.moleculeKey payload)
        , _moleculeCollection: (Payload.moleculeCollection payload)

        , _positionMatrixCollection:
            (Payload.positionMatrixCollection payload)

        , _buildingBlockPositionMatrixCollection:
            (Payload.buildingBlockPositionMatrixCollection payload)

        , _pageIndex: (Payload.pageIndex payload)
        , _numEntriesPerPage: (Payload.numEntriesPerPage payload)
        , _ignoredCollections: (Payload.ignoredCollections payload)
        , _pageKind: (Payload.pageKind payload)
        , _valueCollections: Payload.valueCollections payload
        }
