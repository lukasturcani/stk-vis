module RequestManager.RequestManager.Internal.RequestManager.UnsortedAll
    ( UnsortedAll (..)
    , _pageKind
    , _nextRequest
    ) where

import Prelude
import RequestManager.PageKind (PageKind)
import Effect.Promise (class Deferred, Promise)
import RequestManager.RequestResult as RequestResult
import Requests.UnsortedAll (request)

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
    }


_pageKind :: UnsortedAll -> PageKind
_pageKind (UnsortedAll { _pageKind: pageKind }) = pageKind

_nextRequest
    :: Deferred => UnsortedAll -> Promise RequestResult.RequestResult

_nextRequest
    (UnsortedAll
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
            }
        pure (RequestResult.UnsortedAll result)
