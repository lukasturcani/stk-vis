module RequestManager.InitializeSortedConstructedMolecules
    ( InitializeSortedConstructedMolecules
    , SortedConstructedMoleculesData
    , initializeSortedConstructedMolecules
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
    , columns
    ) where

import RequestManager.PageKind (PageKind)
import RequestManager.SortType (SortType)

type SortedConstructedMoleculesData =
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
    , columns                               :: Array String
    , sortedCollection                      :: String
    , sortType                              :: SortType
    }

data InitializeSortedConstructedMolecules
    = InitializeSortedConstructedMolecules
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
        , _columns                               :: Array String
        , _sortedCollection                      :: String
        , _sortType                              :: SortType
        }

initializeSortedConstructedMolecules
    :: SortedConstructedMoleculesData
    -> InitializeSortedConstructedMolecules

initializeSortedConstructedMolecules
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
    , columns: columns'
    , sortedCollection: sortedCollection'
    , sortType: sortType'
    }
    = InitializeSortedConstructedMolecules
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
        , _columns: columns'
        , _sortedCollection: sortedCollection'
        , _sortType: sortType'
        }

url :: InitializeSortedConstructedMolecules -> String
url (InitializeSortedConstructedMolecules { _url }) = _url

database :: InitializeSortedConstructedMolecules ->   String
database (InitializeSortedConstructedMolecules { _database })
    = _database

moleculeKey :: InitializeSortedConstructedMolecules -> String
moleculeKey (InitializeSortedConstructedMolecules { _moleculeKey })
    = _moleculeKey

moleculeCollection :: InitializeSortedConstructedMolecules -> String
moleculeCollection
    (InitializeSortedConstructedMolecules { _moleculeCollection })
    = _moleculeCollection

constructedMoleculeCollection
    :: InitializeSortedConstructedMolecules -> String

constructedMoleculeCollection
    (InitializeSortedConstructedMolecules
        { _constructedMoleculeCollection }
    )
    = _constructedMoleculeCollection

positionMatrixCollection
    :: InitializeSortedConstructedMolecules
    -> String

positionMatrixCollection
    (InitializeSortedConstructedMolecules
        { _positionMatrixCollection }
    )
    = _positionMatrixCollection

pageIndex :: InitializeSortedConstructedMolecules -> Int
pageIndex (InitializeSortedConstructedMolecules { _pageIndex })
    = _pageIndex

numEntriesPerPage :: InitializeSortedConstructedMolecules -> Int
numEntriesPerPage
    (InitializeSortedConstructedMolecules { _numEntriesPerPage })
    = _numEntriesPerPage

ignoredCollections
    :: InitializeSortedConstructedMolecules
    -> Array String

ignoredCollections
    (InitializeSortedConstructedMolecules { _ignoredCollections })
    = _ignoredCollections

pageKind :: InitializeSortedConstructedMolecules -> PageKind
pageKind (InitializeSortedConstructedMolecules { _pageKind })
    = _pageKind

columns :: InitializeSortedConstructedMolecules -> Array String
columns (InitializeSortedConstructedMolecules { _columns }) = _columns

sortedCollection :: InitializeSortedConstructedMolecules -> String
sortedCollection
    (InitializeSortedConstructedMolecules
        { _sortedCollection }
    )
    = _sortedCollection

sortType :: InitializeSortedConstructedMolecules -> SortType
sortType (InitializeSortedConstructedMolecules { _sortType })
    = _sortType
