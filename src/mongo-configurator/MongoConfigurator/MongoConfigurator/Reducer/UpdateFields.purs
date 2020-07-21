module MongoConfigurator.MongoConfigurator.Internal.Reducer.Internal.UpdateFields
    ( updateFields
    ) where

import MongoConfigurator.UpdateFields.UpdateFields as UpdateFields

import MongoConfigurator.MongoConfigurator.Internal.MongoConfigurator
    ( MongoConfigurator (..)
    )

updateFields
    :: MongoConfigurator
    -> UpdateFields.UpdateFields
    -> MongoConfigurator

updateFields
    (MongoConfigurator
        { _url
        , _database
        , _moleculeKey
        , _moleculeCollection
        , _constructedMoleculeCollection
        , _positionMatrixCollection
        , _buildingBlockPositionMatrixCollection
        , _numEntriesPerPage
        , _searchKind
        }
    )
    action
    = MongoConfigurator
        { _url: UpdateFields.url action
        , _database: UpdateFields.database action
        , _moleculeKey: UpdateFields.moleculeKey action
        , _moleculeCollection: UpdateFields.moleculeCollection action
        , _constructedMoleculeCollection:
            UpdateFields.constructedMoleculeCollection action
        , _positionMatrixCollection:
            UpdateFields.positionMatrixCollection action
        , _buildingBlockPositionMatrixCollection:
            UpdateFields.buildingBlockPositionMatrixCollection action
        , _numEntriesPerPage: UpdateFields.numEntriesPerPage action
        , _searchKind: UpdateFields.searchKind action
        }
