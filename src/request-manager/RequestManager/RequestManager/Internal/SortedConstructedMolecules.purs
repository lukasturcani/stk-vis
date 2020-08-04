module RequestManager.RequestManager.Internal.RequestManager.SortedConstructedMolecules
    ( SortedConstructedMolecules (..)
    , _pageKind
    ) where

import RequestManager.SortType (SortType)
import RequestManager.PageKind (PageKind)

data SortedConstructedMolecules = SortedConstructedMolecules
    { _url                                   :: String
    , _database                              :: String
    , _moleculeKey                           :: String
    , _moleculeCollection                    :: String
    , _constructedMoleculeCollection         :: String
    , _positionMatrixCollection              :: String
    , _pageIndex                             :: Int
    , _numEntriesPerPage                     :: Int
    , _ignoredCollections                    :: Array String
    , _sortedCollection                      :: String
    , _sortType                              :: SortType
    , _pageKind                              :: PageKind
    }

_pageKind :: SortedConstructedMolecules -> PageKind
_pageKind (SortedConstructedMolecules { _pageKind: pageKind })
    = pageKind
