module RequestManager.RequestManager.Internal.RequestManager.UnsortedAll
    ( UnsortedAll (..)
    , valueCollections
    ) where

import RequestManager.PageKind (PageKind)

data UnsortedAll = UnsortedAll
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
    , _valueCollections                      :: Array String
    }

valueCollections :: UnsortedAll -> Array String
valueCollections (UnsortedAll { _valueCollections })
    = _valueCollections
