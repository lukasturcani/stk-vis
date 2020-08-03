module RequestManager.InitializeUnsortedAll
    ( InitializeUnsortedAll
    , UnsortedAllData
    , initializeUnsortedAll
    , url
    , database
    , moleculeKey
    , moleculeCollection
    , positionMatrixCollection
    , buildingBlockPositionMatrixCollection
    , pageIndex
    , numEntriesPerPage
    , ignoredCollections
    ) where

import RequestManager.PageKind (PageKind)

type UnsortedAllData =
    { url                                   :: String
    , database                              :: String
    , moleculeKey                           :: String
    , moleculeCollection                    :: String
    , positionMatrixCollection              :: String
    , buildingBlockPositionMatrixCollection :: String
    , pageIndex                             :: Int
    , numEntriesPerPage                     :: Int
    , ignoredCollections                    :: Array String
    , pageKind                              :: PageKind
    }

data InitializeUnsortedAll = InitializeUnsortedAll
    { _url                                   :: String
    , _database                              :: String
    , _moleculeKey                           :: String
    , _moleculeCollection                    :: String
    , _positionMatrixCollection              :: String
    , _buildingBlockPositionMatrixCollection :: String
    , _pageIndex                             :: Int
    , _numEntriesPerPage                     :: Int
    , _ignoredCollections                    :: Array String
    , _pageKind                              :: PageKind
    }

initializeUnsortedAll :: UnsortedAllData -> InitializeUnsortedAll
initializeUnsortedAll
    { url: url'
    , database: database'
    , moleculeKey: moleculeKey'
    , moleculeCollection: moleculeCollection'
    , positionMatrixCollection: positionMatrixCollection'

    , buildingBlockPositionMatrixCollection:
        buildingBlockPositionMatrixCollection'

    , pageIndex: pageIndex'
    , numEntriesPerPage: numEntriesPerPage'
    , ignoredCollections: ignoredCollections'
    , pageKind: pageKind'
    }
    = InitializeUnsortedAll
        { _url: url'
        , _database: database'
        , _moleculeKey: moleculeKey'
        , _moleculeCollection: moleculeCollection'
        , _positionMatrixCollection: positionMatrixCollection'

        , _buildingBlockPositionMatrixCollection:
            buildingBlockPositionMatrixCollection'

        , _pageIndex: pageIndex'
        , _numEntriesPerPage: numEntriesPerPage'
        , _ignoredCollections: ignoredCollections'
        , _pageKind: pageKind'
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
