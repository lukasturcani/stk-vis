module RequestManager.RequestManager.Internal.RequestManager.SortedAll
    ( SortedAll (..)
    , _pageKind
    , _nextRequest
    , _backRequest
    ) where

import Prelude
import RequestManager.SortType (SortType)
import RequestManager.PageKind (PageKind)
import Effect.Promise (class Deferred, Promise)
import RequestManager.RequestResult as RequestResult
import Requests.SortedAll (request)

import RequestManager.RequestManager.Internal.RequestManager.Internal.Utils
    as Utils

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
        , _pageIndex
        , _numEntriesPerPage: numEntriesPerPage
        , _ignoredCollections: ignoredCollections
        , _sortedCollection: sortedCollection
        , _sortType: sortType
        , _pageKind: pageKind
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
            , pageIndex: Utils.nextPageIndex pageKind _pageIndex
            , numEntriesPerPage
            , ignoredCollections
            , sortedCollection
            , sortType: Utils.toRequestSortType sortType
            }
        pure (RequestResult.SortedAll  result)

_backRequest
    :: Deferred => SortedAll -> Promise RequestResult.RequestResult

_backRequest
    (SortedAll
        { _url: url
        , _database: database
        , _moleculeKey: moleculeKey
        , _moleculeCollection: moleculeCollection
        , _positionMatrixCollection: positionMatrixCollection
        , _buildingBlockPositionMatrixCollection:
            buildingBlockPositionMatrixCollection
        , _pageIndex
        , _numEntriesPerPage: numEntriesPerPage
        , _ignoredCollections: ignoredCollections
        , _sortedCollection: sortedCollection
        , _sortType: sortType
        , _pageKind: pageKind
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
            , pageIndex: Utils.previousPageIndex _pageIndex
            , numEntriesPerPage
            , ignoredCollections
            , sortedCollection
            , sortType: Utils.toRequestSortType sortType
            }
        pure (RequestResult.SortedAll  result)
