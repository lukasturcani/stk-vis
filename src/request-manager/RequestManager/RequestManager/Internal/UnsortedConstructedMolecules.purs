module RequestManager.RequestManager.Internal.RequestManager.UnsortedConstructedMolecules
    ( UnsortedConstructedMolecules (..)
    , valueCollections
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
    , _valueCollections                      :: Array String
    }

valueCollections :: UnsortedConstructedMolecules -> Array String
valueCollections (UnsortedConstructedMolecules { _valueCollections })
    = _valueCollections
