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
        , _constructedMoleculeCollection
        , _positionMatrixCollection
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
            , _constructedMoleculeCollection
            , _positionMatrixCollection
            , _pageIndex
            , _numEntriesPerPage
            , _ignoredCollections
            , _pageKind
            , _sortedCollection: SetSorted.collection payload
            , _sortType: SetSorted.sortType payload
            }
        )
