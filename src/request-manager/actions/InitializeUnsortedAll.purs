module RequestManager.InitializeUnsortedAll
    ( InitializeUnsortedAll
    , UnsortedAllData
    , initializeUnsortedAll
    , url
    , database
    , moleculeKey
    , moleculeCollection
    , constructedMoleculeCollection
    , positionMatrixCollection
    , buildingBlockPositionMatrixCollection
    , pageIndex
    , numEntriesPerPage
    , ignoredCollections
    , pageKind
    , valueCollections
    ) where

import RequestManager.PageKind (PageKind)

type UnsortedAllData =
    { url                                   :: String
    , database                              :: String
    , moleculeKey                           :: String
    , moleculeCollection                    :: String
    , constructedMoleculeCollection         :: String
    , positionMatrixCollection              :: String
    , buildingBlockPositionMatrixCollection :: String
    , pageIndex                             :: Int
    , numEntriesPerPage                     :: Int
    , ignoredCollections                    :: Array String
    , pageKind                              :: PageKind
    , valueCollections                      :: Array String
    }

data InitializeUnsortedAll = InitializeUnsortedAll
    { _url                                   :: String
    , _database                              :: String
    , _moleculeKey                           :: String
    , _moleculeCollection                    :: String
    , _constructedMoleculeCollection         :: String
    , _positionMatrixCollection              :: String
    , _buildingBlockPositionMatrixCollection :: String
    , _pageIndex                             :: Int
    , _numEntriesPerPage                     :: Int
    , _ignoredCollections                    :: Array String
    , _pageKind                              :: PageKind
    , _valueCollections                      :: Array String
    }

initializeUnsortedAll :: UnsortedAllData -> InitializeUnsortedAll
initializeUnsortedAll
    { url: url'
    , database: database'
    , moleculeKey: moleculeKey'
    , moleculeCollection: moleculeCollection'
    , constructedMoleculeCollection: constructedMoleculeCollection'
    , positionMatrixCollection: positionMatrixCollection'

    , buildingBlockPositionMatrixCollection:
        buildingBlockPositionMatrixCollection'

    , pageIndex: pageIndex'
    , numEntriesPerPage: numEntriesPerPage'
    , ignoredCollections: ignoredCollections'
    , pageKind: pageKind'
    , valueCollections: valueCollections'
    }
    = InitializeUnsortedAll
        { _url: url'
        , _database: database'
        , _moleculeKey: moleculeKey'
        , _moleculeCollection: moleculeCollection'

        , _constructedMoleculeCollection:
            constructedMoleculeCollection'
        , _positionMatrixCollection: positionMatrixCollection'

        , _buildingBlockPositionMatrixCollection:
            buildingBlockPositionMatrixCollection'

        , _pageIndex: pageIndex'
        , _numEntriesPerPage: numEntriesPerPage'
        , _ignoredCollections: ignoredCollections'
        , _pageKind: pageKind'
        , _valueCollections: valueCollections'
        }

url :: InitializeUnsortedAll -> String
url (InitializeUnsortedAll { _url }) = _url

database :: InitializeUnsortedAll ->   String
database (InitializeUnsortedAll { _database }) = _database

moleculeKey :: InitializeUnsortedAll -> String
moleculeKey (InitializeUnsortedAll { _moleculeKey }) = _moleculeKey

moleculeCollection :: InitializeUnsortedAll -> String
moleculeCollection (InitializeUnsortedAll { _moleculeCollection })
    = _moleculeCollection

constructedMoleculeCollection :: InitializeUnsortedAll -> String
constructedMoleculeCollection
    (InitializeUnsortedAll { _constructedMoleculeCollection })
    = _constructedMoleculeCollection

positionMatrixCollection :: InitializeUnsortedAll -> String
positionMatrixCollection
    (InitializeUnsortedAll { _positionMatrixCollection })
    = _positionMatrixCollection

buildingBlockPositionMatrixCollection
    :: InitializeUnsortedAll -> String

buildingBlockPositionMatrixCollection
    (InitializeUnsortedAll { _buildingBlockPositionMatrixCollection })
    = _buildingBlockPositionMatrixCollection

pageIndex :: InitializeUnsortedAll -> Int
pageIndex (InitializeUnsortedAll { _pageIndex }) = _pageIndex

numEntriesPerPage :: InitializeUnsortedAll -> Int
numEntriesPerPage (InitializeUnsortedAll { _numEntriesPerPage })
    = _numEntriesPerPage

ignoredCollections :: InitializeUnsortedAll -> Array String
ignoredCollections (InitializeUnsortedAll { _ignoredCollections })
    = _ignoredCollections

pageKind :: InitializeUnsortedAll -> PageKind
pageKind (InitializeUnsortedAll { _pageKind }) = _pageKind

valueCollections :: InitializeUnsortedAll -> Array String
valueCollections (InitializeUnsortedAll { _valueCollections })
    = _valueCollections
