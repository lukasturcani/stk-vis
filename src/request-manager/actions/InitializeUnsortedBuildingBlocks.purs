module RequestManager.InitializeUnsortedBuildingBlocks
    ( InitializeUnsortedBuildingBlocks
    , UnsortedBuildingBlocksData
    , initializeUnsortedBuildingBlocks
    , url
    , database
    , moleculeKey
    , moleculeCollection
    , constructedMoleculeCollection
    , positionMatrixCollection
    , pageIndex
    , numEntriesPerPage
    , ignoredCollections
    , pageKind
    ) where

import RequestManager.PageKind (PageKind)

type UnsortedBuildingBlocksData =
    { url                                   :: String
    , database                              :: String
    , moleculeKey                           :: String
    , moleculeCollection                    :: String
    , constructedMoleculeCollection         :: String
    , positionMatrixCollection              :: String
    , pageIndex                             :: Int
    , numEntriesPerPage                     :: Int
    , ignoredCollections                    :: Array String
    , pageKind                              :: PageKind
    }

data InitializeUnsortedBuildingBlocks
    = InitializeUnsortedBuildingBlocks
        { _url                                   :: String
        , _database                              :: String
        , _moleculeKey                           :: String
        , _moleculeCollection                    :: String
        , _constructedMoleculeCollection         :: String
        , _positionMatrixCollection              :: String
        , _pageIndex                             :: Int
        , _numEntriesPerPage                     :: Int
        , _ignoredCollections                    :: Array String
        , _pageKind                              :: PageKind
        }

initializeUnsortedBuildingBlocks
    :: UnsortedBuildingBlocksData -> InitializeUnsortedBuildingBlocks

initializeUnsortedBuildingBlocks
    { url: url'
    , database: database'
    , moleculeKey: moleculeKey'
    , moleculeCollection: moleculeCollection'
    , constructedMoleculeCollection: constructedMoleculeCollection'
    , positionMatrixCollection: positionMatrixCollection'
    , pageIndex: pageIndex'
    , numEntriesPerPage: numEntriesPerPage'
    , ignoredCollections: ignoredCollections'
    , pageKind: pageKind'
    }
    = InitializeUnsortedBuildingBlocks
        { _url: url'
        , _database: database'
        , _moleculeKey: moleculeKey'
        , _moleculeCollection: moleculeCollection'

        , _constructedMoleculeCollection:
            constructedMoleculeCollection'

        , _positionMatrixCollection: positionMatrixCollection'
        , _pageIndex: pageIndex'
        , _numEntriesPerPage: numEntriesPerPage'
        , _ignoredCollections: ignoredCollections'
        , _pageKind: pageKind'
        }

url :: InitializeUnsortedBuildingBlocks -> String
url (InitializeUnsortedBuildingBlocks { _url }) = _url

database :: InitializeUnsortedBuildingBlocks ->   String
database (InitializeUnsortedBuildingBlocks { _database }) = _database

moleculeKey :: InitializeUnsortedBuildingBlocks -> String
moleculeKey (InitializeUnsortedBuildingBlocks { _moleculeKey })
    = _moleculeKey

moleculeCollection :: InitializeUnsortedBuildingBlocks -> String
moleculeCollection
    (InitializeUnsortedBuildingBlocks { _moleculeCollection })
    = _moleculeCollection

constructedMoleculeCollection
    :: InitializeUnsortedBuildingBlocks -> String

constructedMoleculeCollection
    (InitializeUnsortedBuildingBlocks
        { _constructedMoleculeCollection }
    )
    = _constructedMoleculeCollection

positionMatrixCollection :: InitializeUnsortedBuildingBlocks -> String
positionMatrixCollection
    (InitializeUnsortedBuildingBlocks { _positionMatrixCollection })
    = _positionMatrixCollection

pageIndex :: InitializeUnsortedBuildingBlocks -> Int
pageIndex (InitializeUnsortedBuildingBlocks { _pageIndex })
    = _pageIndex

numEntriesPerPage :: InitializeUnsortedBuildingBlocks -> Int
numEntriesPerPage
    (InitializeUnsortedBuildingBlocks { _numEntriesPerPage })
    = _numEntriesPerPage

ignoredCollections :: InitializeUnsortedBuildingBlocks -> Array String
ignoredCollections
    (InitializeUnsortedBuildingBlocks { _ignoredCollections })
    = _ignoredCollections

pageKind :: InitializeUnsortedBuildingBlocks -> PageKind
pageKind (InitializeUnsortedBuildingBlocks { _pageKind }) = _pageKind
