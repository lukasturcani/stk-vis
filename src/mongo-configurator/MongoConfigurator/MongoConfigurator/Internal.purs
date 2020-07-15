module MongoConfigurator.MongoConfigurator.Internal.MongoConfigurator
    ( MongoConfigurator (..)
    , RequestState (..)
    , SearchKind (..)
    , searchKind
    , url
    , moleculeKey
    , database
    , moleculeCollection
    , constructedMoleculeCollection
    , positionMatrixCollection
    , buildingBlockPositionMatrixCollection
    , numEntriesPerPage
    , requestState
    ) where

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

url :: MongoConfigurator -> String
url (MongoConfigurator { _url }) = _url

database :: MongoConfigurator -> String
database (MongoConfigurator { _database }) = _database

moleculeKey :: MongoConfigurator -> String
moleculeKey (MongoConfigurator { _moleculeKey }) = _moleculeKey

moleculeCollection :: MongoConfigurator -> String
moleculeCollection
    (MongoConfigurator { _moleculeCollection })
    = _moleculeCollection

constructedMoleculeCollection :: MongoConfigurator -> String
constructedMoleculeCollection
    (MongoConfigurator { _constructedMoleculeCollection })
    = _constructedMoleculeCollection

positionMatrixCollection :: MongoConfigurator -> String
positionMatrixCollection
    (MongoConfigurator { _positionMatrixCollection })
    = _positionMatrixCollection

buildingBlockPositionMatrixCollection :: MongoConfigurator -> String
buildingBlockPositionMatrixCollection
    (MongoConfigurator { _buildingBlockPositionMatrixCollection })
    = _buildingBlockPositionMatrixCollection

numEntriesPerPage :: MongoConfigurator -> Int
numEntriesPerPage
    (MongoConfigurator { _numEntriesPerPage })
    = _numEntriesPerPage

searchKind :: MongoConfigurator -> SearchKind
searchKind (MongoConfigurator { _searchKind }) = _searchKind

requestState :: MongoConfigurator -> RequestState
requestState (MongoConfigurator { _requestState }) = _requestState

data SearchKind
    = UnsortedAll
    | UnsortedBuildingBlocks
    | UnsortedConstructedMolecules

data RequestState
    = Unsent
    | Sent
    | Success
    | Failure
