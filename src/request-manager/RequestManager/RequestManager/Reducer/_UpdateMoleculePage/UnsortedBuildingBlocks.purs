module RequestManager.RequestManager.Internal.Reducer._UpdateMoleculePage._UnsortedBuildingBlocks
    ( updateMoleculePage
    ) where

import RequestManager.UpdateMoleculePage as Payload

import RequestManager.RequestManager.Internal.RequestManager.UnsortedBuildingBlocks
    as UnsortedBuildingBlocks

updateMoleculePage
    :: RequestManager.RequestManager
    -> Payload.UpdateMoleculePage
    -> RequestManager.RequestManager

updateMoleculePage
    (UnsortedBuildingBlocks.UnsortedBuildingBlocks
        { _url
        , _database
        , _moleculeKey
        , _moleculeCollection
        , _constructedMoleculeCollection
        , _positionMatrixCollection
        , _numEntriesPerPage
        , _ignoredCollections
        }
    )
    payload
    = UnsortedBuildingBlocks.UnsortedBuildingBlocks
        { _url
        , _database
        , _moleculeKey
        , _moleculeCollection
        , _constructedMoleculeCollection
        , _positionMatrixCollection
        , _pageIndex: Payload.pageIndex payload
        , _numEntriesPerPage
        , _ignoredCollections
        , _pageKind: Payload.pageKind payload
        }
