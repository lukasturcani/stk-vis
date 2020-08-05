module RequestManager.RequestManager.Internal.RequestManager.SortedBuildingBlocks
    ( SortedBuildingBlocks (..)
    , _pageKind
    , _nextRequest
    ) where

import Prelude
import RequestManager.SortType (SortType)
import RequestManager.PageKind (PageKind)
import Effect.Promise (class Deferred, Promise)
import RequestManager.RequestResult as RequestResult
import Requests.SortedBuildingBlocks (request)

import RequestManager.RequestManager.Internal.RequestManager.Internal.Utils
    as Utils

data SortedBuildingBlocks = SortedBuildingBlocks
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

_pageKind :: SortedBuildingBlocks -> PageKind
_pageKind (SortedBuildingBlocks { _pageKind: pageKind }) = pageKind

_nextRequest
    :: Deferred
    => SortedBuildingBlocks
    -> Promise RequestResult.RequestResult

_nextRequest
    (SortedBuildingBlocks
        { _url: url
        , _database: database
        , _moleculeKey: moleculeKey
        , _moleculeCollection: moleculeCollection
        , _positionMatrixCollection: positionMatrixCollection
        , _constructedMoleculeCollection: constructedMoleculeCollection
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
            , constructedMoleculeCollection
            , positionMatrixCollection
            , pageIndex: Utils.nextPageIndex pageKind _pageIndex
            , numEntriesPerPage
            , ignoredCollections
            , sortedCollection
            , sortType: Utils.toRequestSortType sortType
            }
        pure (RequestResult.SortedBuildingBlocks result)
