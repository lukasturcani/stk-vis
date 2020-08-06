module RequestManager.RequestManager.Internal.Reducer.Internal.UpdateMoleculePage.Internal.UnsortedBuildingBlocks
    ( updateMoleculePage
    ) where

import RequestManager.UpdateMoleculePage as Payload

import RequestManager.RequestManager.Internal.RequestManager.UnsortedBuildingBlocks
    as UnsortedBuildingBlocks

updateMoleculePage
    :: UnsortedBuildingBlocks.UnsortedBuildingBlocks
    -> Payload.UpdateMoleculePage
    -> UnsortedBuildingBlocks.UnsortedBuildingBlocks

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
