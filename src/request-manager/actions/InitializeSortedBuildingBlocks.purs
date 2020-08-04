module RequestManager.InitializeSortedBuildingBlocks
    ( InitializeSortedBuildingBlocks
    , SortedBuildingBlocksData
    , initializeSortedBuildingBlocks
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
    , sortedCollection
    , sortType
    ) where

import RequestManager.PageKind (PageKind)
import RequestManager.SortType (SortType)

type SortedBuildingBlocksData =
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
    , sortedCollection                      :: String
    , sortType                              :: SortType
    }

data InitializeSortedBuildingBlocks
    = InitializeSortedBuildingBlocks
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
        , _sortedCollection                      :: String
        , _sortType                              :: SortType
        }

initializeSortedBuildingBlocks
    :: SortedBuildingBlocksData -> InitializeSortedBuildingBlocks

initializeSortedBuildingBlocks
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
    , sortedCollection: sortedCollection'
    , sortType: sortType'
    }
    = InitializeSortedBuildingBlocks
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
        , _sortedCollection: sortedCollection'
        , _sortType: sortType'
        }

url :: InitializeSortedBuildingBlocks -> String
url (InitializeSortedBuildingBlocks { _url }) = _url

database :: InitializeSortedBuildingBlocks ->   String
database (InitializeSortedBuildingBlocks { _database }) = _database

moleculeKey :: InitializeSortedBuildingBlocks -> String
moleculeKey (InitializeSortedBuildingBlocks { _moleculeKey })
    = _moleculeKey

moleculeCollection :: InitializeSortedBuildingBlocks -> String
moleculeCollection
    (InitializeSortedBuildingBlocks { _moleculeCollection })
    = _moleculeCollection

constructedMoleculeCollection
    :: InitializeSortedBuildingBlocks -> String

constructedMoleculeCollection
    (InitializeSortedBuildingBlocks
        { _constructedMoleculeCollection }
    )
    = _constructedMoleculeCollection

positionMatrixCollection :: InitializeSortedBuildingBlocks -> String
positionMatrixCollection
    (InitializeSortedBuildingBlocks { _positionMatrixCollection })
    = _positionMatrixCollection

pageIndex :: InitializeSortedBuildingBlocks -> Int
pageIndex (InitializeSortedBuildingBlocks { _pageIndex })
    = _pageIndex

numEntriesPerPage :: InitializeSortedBuildingBlocks -> Int
numEntriesPerPage
    (InitializeSortedBuildingBlocks { _numEntriesPerPage })
    = _numEntriesPerPage

ignoredCollections :: InitializeSortedBuildingBlocks -> Array String
ignoredCollections
    (InitializeSortedBuildingBlocks { _ignoredCollections })
    = _ignoredCollections

pageKind :: InitializeSortedBuildingBlocks -> PageKind
pageKind (InitializeSortedBuildingBlocks { _pageKind }) = _pageKind

sortedCollection :: InitializeSortedBuildingBlocks -> String
sortedCollection (InitializeSortedBuildingBlocks { _sortedCollection })
    = _sortedCollection

sortType :: InitializeSortedBuildingBlocks -> SortType
sortType (InitializeSortedBuildingBlocks { _sortType }) = _sortType
