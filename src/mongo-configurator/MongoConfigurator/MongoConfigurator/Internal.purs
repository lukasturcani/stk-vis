module MongoConfigurator.MongoConfigurator.Internal.MongoConfigurator
    ( MongoConfigurator (..)
    ) where

import MongoConfigurator.SearchKind (SearchKind)

data MongoConfigurator = MongoConfigurator
    { _url                                   :: String
    , _database                              :: String
    , _moleculeKey                           :: String
    , _moleculeCollection                    :: String
    , _constructedMoleculeCollection         :: String
    , _positionMatrixCollection              :: String
    , _buildingBlockPositionMatrixCollection :: String
    , _numEntriesPerPage                     :: Int
    , _searchKind                            :: SearchKind
    }
