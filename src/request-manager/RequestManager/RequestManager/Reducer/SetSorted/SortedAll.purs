module RequestManager.RequestManager.Internal.Reducer.Internal.SetSorted.Internal.SortedAll
    ( setSorted
    ) where

import RequestManager.RequestManager.Internal.RequestManager
    as RequestManager

import RequestManager.SetSorted as SetSorted

import RequestManager.RequestManager.Internal.RequestManager.SortedAll
    as SortedAll

setSorted
    :: SortedAll
    -> SetSorted.SetSorted
    -> RequestManager.RequestManager

setSorted
    (SortedAll.SortedAll
        { _url
        , _database
        , _moleculeKey
        , _moleculeCollection
        , _positionMatrixCollection
        , _buildingBlockPositionMatrixCollection
        , _pageIndex
        , _numEntriesPerPage
        , _ignoredCollections
        , _pageKind
        }
    )
    payload
    = RequestManager.SortedAll
        (SortedAll.SortedAll
            { _url
            , _database
            , _moleculeKey
            , _moleculeCollection
            , _positionMatrixCollection
            , _buildingBlockPositionMatrixCollection
            , _pageIndex
            , _numEntriesPerPage
            , _ignoredCollections
            , _pageKind
            , _sortedCollection: collection payload
            , _sortType: sortType payload
            }
        )
