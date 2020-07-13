module MongoConfigurator.Reducers.UpdateFields
    ( updateFields
    ) where

import MongoConfigurator.UpdateFields (Action)

import MongoConfigurator.Data
    ( MongoConfigurator (..)
    , searchKind
    , requestState
    )

updateFields :: MongoConfigurator -> Action -> MongoConfigurator
updateFields
    (MongoConfigurator
        { _url
        , _database
        , _moleculeKey
        , _moleculeCollection
        , _constructedMoleculeCollection
        , _positionMatrixCollection
        , _buildingBlockPositionMatrixCollection
        , _valueCollections
        , _numEntriesPerPage
        , _searchKind
        , _requestState
        }
    )
    action
    = MongoConfigurator
        {
        }
