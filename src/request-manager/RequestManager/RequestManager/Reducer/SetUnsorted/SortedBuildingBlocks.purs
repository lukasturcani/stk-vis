module RequestManager.RequestManager.Internal.Reducer.Internal.SetUnsorted.Internal.SortedBuildingBlocks
    ( setUnsorted
    ) where

import RequestManager.RequestManager.Internal.RequestManager
    as RequestManager

import RequestManager.SetUnsorted as SetUnsorted

import RequestManager.RequestManager.Internal.RequestManager.SortedBuildingBlocks
    as SortedBuildingBlocks

import RequestManager.RequestManager.Internal.RequestManager.UnsortedBuildingBlocks
    as UnsortedBuildingBlocks

setUnsorted
    :: SortedBuildingBlocks.SortedBuildingBlocks
    -> SetUnsorted.SetUnsorted
    -> RequestManager.RequestManager

setUnsorted
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
        , _columns
        }
    )
    payload
    = RequestManager.UnsortedBuildingBlocks
        (UnsortedBuildingBlocks.UnsortedBuildingBlocks
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
            , _columns
            }
        )
