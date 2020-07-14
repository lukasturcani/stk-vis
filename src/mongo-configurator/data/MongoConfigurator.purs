module MongoConfigurator.Internal.Data
    ( MongoConfigurator (..)
    , RequestState (..)
    , SearchKind
    , searchKind
    ) where

import MongoConfigurator.UpdateFields as UpdateFields

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
    , _requestState                          :: RequestState
    }

data SearchKind
    = UnsortedAll
    | UnsortedBuildingBlocks
    | UnsortedConstructedMolecules

searchKind :: UpdateFields.SearchKind -> SearchKind

searchKind UpdateFields.UnsortedAll
    = UnsortedAll

searchKind UpdateFields.UnsortedBuildingBlocks
    = UnsortedBuildingBlocks

searchKind UpdateFields.UnsortedConstructedMolecules
    = UnsortedConstructedMolecules


data RequestState
    = Unsent
    | Sent
    | Success
    | Failure
