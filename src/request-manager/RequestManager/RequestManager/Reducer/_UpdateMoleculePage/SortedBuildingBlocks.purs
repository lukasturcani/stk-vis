module RequestManager.RequestManager.Internal.Reducer._UpdateMoleculePage._SortedBuildingBlocks
    ( updateMoleculePage
    ) where

import RequestManager.UpdateMoleculePage as Payload

import RequestManager.RequestManager.Internal.RequestManager.SortedBuildingBlocks
    as SortedBuildingBlocks

updateMoleculePage
    :: RequestManager.RequestManager
    -> Payload.UpdateMoleculePage
    -> RequestManager.RequestManager

updateMoleculePage
    (SortedBuildingBlocks.SortedBuildingBlocks
        { _url
        , _database
        , _moleculeKey
        , _moleculeCollection
        , _constructedMoleculeCollection
        , _positionMatrixCollection
        , _numEntriesPerPage
        , _ignoredCollections
        , _sortedCollection
        , _sortType
        }
    )
    payload
    = SortedBuildingBlocks.SortedBuildingBlocks
        { _url
        , _database
        , _moleculeKey
        , _moleculeCollection
        , _constructedMoleculeCollection
        , _positionMatrixCollection
        , _pageIndex: Payload.pageIndex payload
        , _numEntriesPerPage
        , _ignoredCollections
        , _sortedCollection
        , _sortType
        , _pageKind: Payload.pageKind payload
        }
