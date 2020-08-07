module RequestManager.InitializeSortedAll
    ( InitializeSortedAll
    , SortedAllData
    , initializeSortedAll
    , url
    , database
    , moleculeKey
    , moleculeCollection
    , positionMatrixCollection
    , buildingBlockPositionMatrixCollection
    , pageIndex
    , numEntriesPerPage
    , ignoredCollections
    , pageKind
    , sortedCollection
    , sortType
    , valueCollections
    ) where

import RequestManager.PageKind (PageKind)
import RequestManager.SortType (SortType)

type SortedAllData =
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
    , sortedCollection                      :: String
    , sortType                              :: SortType
    , valueCollections                      :: Array String
    }

data InitializeSortedAll = InitializeSortedAll
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
    , _sortedCollection                      :: String
    , _sortType                              :: SortType
    , _valueCollections                      :: Array String
    }

initializeSortedAll :: SortedAllData -> InitializeSortedAll
initializeSortedAll
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
    , sortedCollection: sortedCollection'
    , sortType: sortType'
    , valueCollections: valueCollections'
    }
    = InitializeSortedAll
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
        , _sortedCollection: sortedCollection'
        , _sortType: sortType'
        , _valueCollections: valueCollections'
        }

url :: InitializeSortedAll -> String
url (InitializeSortedAll { _url }) = _url

database :: InitializeSortedAll ->   String
database (InitializeSortedAll { _database }) = _database

moleculeKey :: InitializeSortedAll -> String
moleculeKey (InitializeSortedAll { _moleculeKey }) = _moleculeKey

moleculeCollection :: InitializeSortedAll -> String
moleculeCollection (InitializeSortedAll { _moleculeCollection })
    = _moleculeCollection

positionMatrixCollection :: InitializeSortedAll -> String
positionMatrixCollection
    (InitializeSortedAll { _positionMatrixCollection })
    = _positionMatrixCollection

buildingBlockPositionMatrixCollection
    :: InitializeSortedAll -> String

buildingBlockPositionMatrixCollection
    (InitializeSortedAll { _buildingBlockPositionMatrixCollection })
    = _buildingBlockPositionMatrixCollection

pageIndex :: InitializeSortedAll -> Int
pageIndex (InitializeSortedAll { _pageIndex }) = _pageIndex

numEntriesPerPage :: InitializeSortedAll -> Int
numEntriesPerPage (InitializeSortedAll { _numEntriesPerPage })
    = _numEntriesPerPage

ignoredCollections :: InitializeSortedAll -> Array String
ignoredCollections (InitializeSortedAll { _ignoredCollections })
    = _ignoredCollections

pageKind :: InitializeSortedAll -> PageKind
pageKind (InitializeSortedAll { _pageKind }) = _pageKind

sortedCollection :: InitializeSortedAll -> String
sortedCollection (InitializeSortedAll { _sortedCollection })
    = _sortedCollection

sortType :: InitializeSortedAll -> SortType
sortType (InitializeSortedAll { _sortType }) = _sortType

valueCollections :: InitializeSortedAll -> Array String
valueCollections (InitializeSortedAll { _valueCollections })
    = _valueCollections
