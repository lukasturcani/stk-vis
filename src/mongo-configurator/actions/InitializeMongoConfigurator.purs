module MongoConfigurator.InitializeMongoConfigurator
    ( InitializeMongoConfigurator
    , ConfiguratorData
    , initializeMongoConfigurator
    , url
    , database
    , moleculeKey
    , moleculeCollection
    , constructedMoleculeCollection
    , positionMatrixCollection
    , buildingBlockPositionMatrixCollection
    , numEntriesPerPage
    , ignoredCollections
    , searchKind
    ) where

import MongoConfigurator.SearchKind (SearchKind)

type ConfiguratorData =
    { url                                   :: String
    , database                              :: String
    , moleculeKey                           :: String
    , moleculeCollection                    :: String
    , constructedMoleculeCollection         :: String
    , positionMatrixCollection              :: String
    , buildingBlockPositionMatrixCollection :: String
    , numEntriesPerPage                     :: Int
    , ignoredCollections                    :: Array String
    , searchKind                            :: SearchKind
    }

data InitializeMongoConfigurator = InitializeMongoConfigurator
    { _url                                   :: String
    , _database                              :: String
    , _moleculeKey                           :: String
    , _moleculeCollection                    :: String
    , _constructedMoleculeCollection         :: String
    , _positionMatrixCollection              :: String
    , _buildingBlockPositionMatrixCollection :: String
    , _numEntriesPerPage                     :: Int
    , _ignoredCollections                    :: Array String
    , _searchKind                            :: SearchKind
    }

initializeMongoConfigurator
    :: ConfiguratorData -> InitializeMongoConfigurator

initializeMongoConfigurator
    { url: _url
    , database: _database
    , moleculeKey: _moleculeKey
    , moleculeCollection: _moleculeCollection
    , constructedMoleculeCollection: _constructedMoleculeCollection
    , positionMatrixCollection: _positionMatrixCollection
    , buildingBlockPositionMatrixCollection:
        _buildingBlockPositionMatrixCollection
    , numEntriesPerPage: _numEntriesPerPage
    , ignoredCollections: _ignoredCollections
    , searchKind: _searchKind
    }
    = InitializeMongoConfigurator
        { _url
        , _database
        , _moleculeKey
        , _moleculeCollection
        , _constructedMoleculeCollection
        , _positionMatrixCollection
        , _buildingBlockPositionMatrixCollection
        , _numEntriesPerPage
        , _ignoredCollections
        , _searchKind
        }

url :: InitializeMongoConfigurator -> String
url (InitializeMongoConfigurator { _url }) = _url

database :: InitializeMongoConfigurator -> String
database (InitializeMongoConfigurator { _database }) = _database

moleculeKey :: InitializeMongoConfigurator -> String
moleculeKey (InitializeMongoConfigurator { _moleculeKey })
    = _moleculeKey

moleculeCollection :: InitializeMongoConfigurator -> String
moleculeCollection
    (InitializeMongoConfigurator { _moleculeCollection })
    = _moleculeCollection

constructedMoleculeCollection :: InitializeMongoConfigurator -> String
constructedMoleculeCollection
    (InitializeMongoConfigurator { _constructedMoleculeCollection })
    = _constructedMoleculeCollection

positionMatrixCollection :: InitializeMongoConfigurator -> String
positionMatrixCollection
    (InitializeMongoConfigurator { _positionMatrixCollection })
    = _positionMatrixCollection

buildingBlockPositionMatrixCollection
    :: InitializeMongoConfigurator -> String
buildingBlockPositionMatrixCollection
    (InitializeMongoConfigurator
        { _buildingBlockPositionMatrixCollection }
    )
    = _buildingBlockPositionMatrixCollection

numEntriesPerPage :: InitializeMongoConfigurator -> Int
numEntriesPerPage (InitializeMongoConfigurator { _numEntriesPerPage })
    = _numEntriesPerPage

ignoredCollections :: InitializeMongoConfigurator -> Array String
ignoredCollections
    (InitializeMongoConfigurator { _ignoredCollections })
    = _ignoredCollections

searchKind :: InitializeMongoConfigurator -> SearchKind
searchKind
    (InitializeMongoConfigurator { _searchKind })
    = _searchKind

