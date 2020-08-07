module RequestManager.RequestManager.Internal.RequestManager.SortedAll
    ( SortedAll (..)
    , valueCollections
    ) where

import RequestManager.SortType (SortType)
import RequestManager.PageKind (PageKind)

data SortedAll = SortedAll
    { _url                                   :: String
    , _database                              :: String
    , _moleculeKey                           :: String
    , _moleculeCollection                    :: String
    , _positionMatrixCollection              :: String
    , _buildingBlockPositionMatrixCollection :: String
    , _pageIndex                             :: Int
    , _numEntriesPerPage                     :: Int
    , _ignoredCollections                    :: Array String
    , _sortedCollection                      :: String
    , _sortType                              :: SortType
    , _pageKind                              :: PageKind
    , _valueCollections                      :: Array String
    }

valueCollections :: SortedAll -> Array String
valueCollections (SortedAll { _valueCollections })
    = _valueCollections
