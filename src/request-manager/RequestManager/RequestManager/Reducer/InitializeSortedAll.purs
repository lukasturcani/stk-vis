module RequestManager.RequestManager.Internal.Reducer.Internal.InitializeSortedAll
    ( initializeSortedAll
    ) where

import RequestManager.InitializeSortedAll as Payload

import RequestManager.RequestManager.Internal.RequestManager
    ( RequestManager (SortedAll)
    ) as RequestManager

import RequestManager.RequestManager.Internal.RequestManager.SortedAll
    as SortedAll

initializeSortedAll
    :: RequestManager.RequestManager
    -> Payload.InitializeSortedAll
    -> RequestManager.RequestManager

initializeSortedAll _ payload
    = RequestManager.SortedAll sortedAll
  where
    sortedAll = SortedAll.SortedAll
        { _url: Payload.url payload
        , _database: Payload.database payload
        , _moleculeKey: Payload.moleculeKey payload
        , _moleculeCollection: Payload.moleculeCollection payload

        , _positionMatrixCollection:
            Payload.positionMatrixCollection payload

        , _buildingBlockPositionMatrixCollection:
            Payload.buildingBlockPositionMatrixCollection payload

        , _pageIndex: Payload.pageIndex payload
        , _numEntriesPerPage: Payload.numEntriesPerPage payload
        , _ignoredCollections: Payload.ignoredCollections payload
        , _pageKind: Payload.pageKind payload
        , _sortedCollection: Payload.sortedCollection payload
        , _sortType: Payload.sortType payload
        }
