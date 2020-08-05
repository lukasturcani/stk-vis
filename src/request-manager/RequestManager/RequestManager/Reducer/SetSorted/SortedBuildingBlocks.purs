module RequestManager.RequestManager.Internal.Reducer.Internal.SetSorted.Internal.SortedBuildingBlocks
    ( setSorted
    ) where

import RequestManager.RequestManager.Internal.RequestManager
    as RequestManager

import RequestManager.SetSorted as SetSorted

import RequestManager.RequestManager.Internal.RequestManager.SortedBuildingBlocks
    as SortedBuildingBlocks

setSorted
    :: SortedBuildingBlocks
    -> SetSorted.SetSorted
    -> RequestManager.RequestManager

setSorted
    (SortedBuildingBlocks.SortedBuildingBlocks
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
    = RequestManager.SortedBuildingBlocks
        (SortedBuildingBlocks.SortedBuildingBlocks
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
