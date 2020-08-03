module RequestManager.RequestManager.Internal.InitialState
    ( initialState
    ) where

import RequestManager.RequestManager.Internal.RequestManager
    ( RequestManager (UnsortedAll)
    ) as RequestManager

import RequestManager.RequestManager.Internal.RequestManager.UnsortedAll
    ( UnsortedAll (UnsortedAll)
    ) as UnsortedAll

initialState :: RequestManager
initialState = RequestManager.UnsortedAll unsortedAll
  where
    unsortedAll = UnsortedAll.UnsortedAll
        { _url: "mongodb://localhost:27017"
        , _database: "stkVis"
        , _moleculeKey: "InChIKey"
        , _moleculeCollection: "molecules"
        , _positionMatrixCollection: "position_matrices"
        , _buildingBlockPositionMatrixCollection:
            "building_block_position_matrices"
        , _pageIndex: 0
        , _numEntriesPerPage: 34
        , _ignoredCollections: []
        }
