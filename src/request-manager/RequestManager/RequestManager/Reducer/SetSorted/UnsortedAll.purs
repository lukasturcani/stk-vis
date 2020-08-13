module RequestManager.RequestManager.Internal.Reducer.Internal.SetSorted.Internal.UnsortedAll
    ( setSorted
    ) where

import RequestManager.RequestManager.Internal.RequestManager
    as RequestManager

import RequestManager.SetSorted as SetSorted

import RequestManager.RequestManager.Internal.RequestManager.SortedAll
    as SortedAll

import RequestManager.RequestManager.Internal.RequestManager.UnsortedAll
    as UnsortedAll

setSorted
    :: UnsortedAll.UnsortedAll
    -> SetSorted.SetSorted
    -> RequestManager.RequestManager

setSorted
    (UnsortedAll.UnsortedAll
        { _url
        , _database
        , _moleculeKey
        , _moleculeCollection
        , _constructedMoleculeCollection
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
            , _constructedMoleculeCollection
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
