module MongoConfigurator.Reducer
    ( reducer
    ) where

import MongoConfigurator.Payload (Payload)

import MongoConfigurator.Data
    ( MongoConfigurator (..)
    , searchKind
    , requestState
    )

reducer :: MongoConfigurator -> Payload -> MongoConfigurator
reducer
    MongoConfigurator
        { _url                                   :: String
        , _database                              :: String
        , _moleculeKey                           :: String
        , _moleculeCollection                    :: String
        , _constructedMoleculeCollection         :: String
        , _positionMatrixCollection              :: String
        , _buildingBlockPositionMatrixCollection :: String
        , _valueCollections                      :: String
        , _numEntriesPerPage                     :: Number
        , _searchKind                            :: SearchKind
        , _requestState                          :: RequestState
        }


reducer state _ = state
