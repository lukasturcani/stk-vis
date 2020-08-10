module MongoConfigurator.MongoConfigurator.Internal.Reducer.Internal.InitializeMongoConfigurator
    ( initializeMongoConfigurator
    ) where

import MongoConfigurator.InitializeMongoConfigurator as Payload

import MongoConfigurator.MongoConfigurator.Internal.MongoConfigurator
    ( MongoConfigurator (MongoConfigurator)
    )


initializeMongoConfigurator
    :: MongoConfigurator
    -> Payload.InitializeMongoConfigurator
    -> MongoConfigurator

initializeMongoConfigurator
    configurator
    payload
    = MongoConfigurator
        { _url: Payload.url payload
        , _database: Payload.database payload
        , _moleculeKey: Payload.moleculeKey payload
        , _moleculeCollection: Payload.moleculeCollection payload
        , _constructedMoleculeCollection:
            Payload.constructedMoleculeCollection payload
        , _positionMatrixCollection:
            Payload.positionMatrixCollection payload
        , _buildingBlockPositionMatrixCollection:
            Payload.buildingBlockPositionMatrixCollection payload
        , _numEntriesPerPage: Payload.numEntriesPerPage payload
        , _searchKind: Payload.searchKind payload
        }
