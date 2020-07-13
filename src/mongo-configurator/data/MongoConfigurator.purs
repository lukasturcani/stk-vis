module MongoConfigurator.Data
    ( MongoConfigurator (..)
    , SearchKind
    , RequestState (..)
    , searchKind
    ) where

import MongoConfigurator.MongoData as MongoData

data MongoConfigurator = MongoConfigurator
    { _url                                   :: String
    , _database                              :: String
    , _moleculeKey                           :: String
    , _moleculeCollection                    :: String
    , _constructedMoleculeCollection         :: String
    , _positionMatrixCollection              :: String
    , _buildingBlockPositionMatrixCollection :: String
    , _numEntriesPerPage                     :: Number
    , _searchKind                            :: SearchKind
    , _requestState                          :: RequestState
    }

data SearchKind
    = UnsortedAll
    | UnsortedBuildingBlocks
    | UnsortedConstructedMolecules

searchKind :: MongoData.SearchKind -> SearchKind

searchKind MongoData.UnsortedAll
    = UnsortedAll

searchKind MongoData.UnsortedBuildingBlocks
    = UnsortedBuildingBlocks

searchKind MongoData.UnsortedConstructedMolecules
    = UnsortedConstructedMolecules


data RequestState
    = Unsent
    | Sent
    | Success
    | Failure
