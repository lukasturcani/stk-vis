module RequestManager.RequestManager.Internal.RequestManager.UnsortedBuildingBlocks
    ( UnsortedBuildingBlocks (..)
    , _pageKind
    ) where

import RequestManager.PageKind (PageKind)

data UnsortedBuildingBlocks = UnsortedBuildingBlocks
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

_pageKind :: UnsortedBuildingBlocks -> PageKind
_pageKind (UnsortedBuildingBlocks { _pageKind: pageKind }) = pageKind
