module RequestManager.RequestManager.Internal.RequestManager.UnsortedConstructedMolecules
    ( UnsortedConstructedMolecules (..)
    , _pageKind
    ) where

import RequestManager.PageKind (PageKind)

data UnsortedConstructedMolecules = UnsortedConstructedMolecules
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

_pageKind :: UnsortedConstructedMolecules -> PageKind
_pageKind (UnsortedConstructedMolecules { _pageKind: pageKind })
    = pageKind
