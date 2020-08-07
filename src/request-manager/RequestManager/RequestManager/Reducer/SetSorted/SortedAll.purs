module RequestManager.RequestManager.Internal.Reducer.Internal.SetSorted.Internal.SortedAll
    ( setSorted
    ) where

import RequestManager.RequestManager.Internal.RequestManager
    as RequestManager

import RequestManager.SetSorted as SetSorted

import RequestManager.RequestManager.Internal.RequestManager.SortedAll
    as SortedAll

setSorted
    :: SortedAll.SortedAll
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
        , _valueCollections
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
            , _valueCollections
            , _sortedCollection: SetSorted.collection payload
            , _sortType: SetSorted.sortType payload
            }
        )
