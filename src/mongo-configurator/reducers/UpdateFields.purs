module MongoConfigurator.Reducers.Internal.UpdateFields
    ( updateFields
    ) where

import Prelude
import MongoConfigurator.UpdateFields as UpdateFields

import MongoConfigurator.Internal.Data
    ( MongoConfigurator (..)
    , searchKind
    )

updateFields
    :: MongoConfigurator -> UpdateFields.Action -> MongoConfigurator

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
        , _requestState
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
        , _searchKind: searchKind $ UpdateFields.searchKind action
        , _requestState
        }
