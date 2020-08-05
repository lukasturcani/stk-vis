module RequestManager.RequestManager.Internal.RequestManager.SortedAll
    ( SortedAll (..)
    , _pageKind
    , _nextRequest
    ) where

import Prelude
import RequestManager.SortType (SortType (..))
import RequestManager.PageKind (PageKind)
import Effect.Promise (class Deferred, Promise)
import RequestManager.RequestResult as RequestResult
import Requests.SortedAll (request)
import Requests.SortType as Requests.SortType

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
    }

_pageKind :: SortedAll -> PageKind
_pageKind (SortedAll { _pageKind: pageKind  }) = pageKind

_nextRequest
    :: Deferred => SortedAll -> Promise RequestResult.RequestResult

_nextRequest
    (SortedAll
        { _url: url
        , _database: database
        , _moleculeKey: moleculeKey
        , _moleculeCollection: moleculeCollection
        , _positionMatrixCollection: positionMatrixCollection
        , _buildingBlockPositionMatrixCollection:
            buildingBlockPositionMatrixCollection
        , _pageIndex: pageIndex
        , _numEntriesPerPage: numEntriesPerPage
        , _ignoredCollections: ignoredCollections
        , _sortedCollection: sortedCollection
        , _sortType: sortType
        }
    )
    = do
        result <- request
            { url
            , database
            , moleculeKey
            , moleculeCollection
            , positionMatrixCollection
            , buildingBlockPositionMatrixCollection
            , pageIndex
            , numEntriesPerPage
            , ignoredCollections
            , sortedCollection
            , sortType: _toRequestSortType sortType
            }
        pure (RequestResult.SortedAll  result)


_toRequestSortType :: SortType -> Requests.SortType.SortType
_toRequestSortType Ascending = Requests.SortType.Ascending
_toRequestSortType Descending = Requests.SortType.Descending
