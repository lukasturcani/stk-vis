module RequestManager.RequestManager.Internal.Reducer.Internal.SetUnsorted.Internal.SortedAll
    ( setUnsorted
    ) where

import RequestManager.RequestManager.Internal.RequestManager
    as RequestManager

import RequestManager.SetUnsorted as SetUnsorted

import RequestManager.RequestManager.Internal.RequestManager.SortedAll
    as SortedAll

import RequestManager.RequestManager.Internal.RequestManager.UnsortedAll
    as UnsortedAll

setUnsorted
    :: SortedAll.SortedAll
    -> SetUnsorted.SetUnsorted
    -> RequestManager.RequestManager

setUnsorted
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
        }
    )
    payload
    = RequestManager.UnsortedAll
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
