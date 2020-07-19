module MongoConfigurator.MongoConfigurator.Internal.InitialState
    ( initialState
    ) where

import MongoConfigurator.SearchKind (SearchKind (UnsortedAll))

import MongoConfigurator.MongoConfigurator.Internal.MongoConfigurator
    ( MongoConfigurator (MongoConfigurator)
    , RequestState (Unsent)
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
        "building_block_position_matrices"
    , _numEntriesPerPage: 34
    , _searchKind: UnsortedAll
    , _requestState: Unsent
    }
