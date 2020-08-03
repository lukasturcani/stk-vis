module RequestManager.InitializeUnsortedConstructedMolecules
    ( InitializeUnsortedConstructedMolecules
    , UnsortedConstructedMoleculesData
    , initializeUnsortedConstructedMolecules
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

type UnsortedConstructedMoleculesData =
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

data InitializeUnsortedConstructedMolecules
    = InitializeUnsortedConstructedMolecules
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

initializeUnsortedConstructedMolecules
    :: UnsortedConstructedMoleculesData
    -> InitializeUnsortedConstructedMolecules

initializeUnsortedConstructedMolecules
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
    = InitializeUnsortedConstructedMolecules
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

url :: InitializeUnsortedConstructedMolecules -> String
url (InitializeUnsortedConstructedMolecules { _url }) = _url

database :: InitializeUnsortedConstructedMolecules ->   String
database (InitializeUnsortedConstructedMolecules { _database })
    = _database

moleculeKey :: InitializeUnsortedConstructedMolecules -> String
moleculeKey (InitializeUnsortedConstructedMolecules { _moleculeKey })
    = _moleculeKey

moleculeCollection :: InitializeUnsortedConstructedMolecules -> String
moleculeCollection
    (InitializeUnsortedConstructedMolecules { _moleculeCollection })
    = _moleculeCollection

constructedMoleculeCollection
    :: InitializeUnsortedConstructedMolecules -> String

constructedMoleculeCollection
    (InitializeUnsortedConstructedMolecules
        { _constructedMoleculeCollection }
    )
    = _constructedMoleculeCollection

positionMatrixCollection
    :: InitializeUnsortedConstructedMolecules -> String

positionMatrixCollection
    (InitializeUnsortedConstructedMolecules
        { _positionMatrixCollection }
    )
    = _positionMatrixCollection

pageIndex :: InitializeUnsortedConstructedMolecules -> Int
pageIndex (InitializeUnsortedConstructedMolecules { _pageIndex })
    = _pageIndex

numEntriesPerPage :: InitializeUnsortedConstructedMolecules -> Int
numEntriesPerPage
    (InitializeUnsortedConstructedMolecules { _numEntriesPerPage })
    = _numEntriesPerPage

ignoredCollections
    :: InitializeUnsortedConstructedMolecules -> Array String

ignoredCollections
    (InitializeUnsortedConstructedMolecules { _ignoredCollections })
    = _ignoredCollections

pageKind :: InitializeUnsortedConstructedMolecules -> PageKind
pageKind (InitializeUnsortedConstructedMolecules { _pageKind })
    = _pageKind
