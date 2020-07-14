module MongoConfigurator.Internal.InitialState
    ( initialState
    ) where

import MongoConfigurator.Internal.Data
    ( MongoConfigurator (MongoConfigurator)
    , RequestState (Unsent)
    , SearchKind (UnsortedAll)
    )

initialState :: MongoConfigurator
initialState = MongoConfigurator
    { _url: "mongodb://localhost:27017"
    , _database: "stkVis"
    , _moleculeKey: "InChIKey"
    , _moleculeCollection: "molecules"
    , _constructedMoleculeCollection: "constructed_molecules"
    , _positionMatrixCollection: "position_matrices"
    , _buildingBlockPositionMatrixCollection:
        "building_block_position_matrix_collection"
    , _numEntriesPerPage: 34
    , _searchKind: UnsortedAll
    , _requestState: Unsent
    }
