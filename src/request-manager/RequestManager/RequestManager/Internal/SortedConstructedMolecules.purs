module RequestManager.RequestManager.Internal.RequestManager.SortedConstructedMolecules
    ( SortedConstructedMolecules (..)
    , _pageKind
    , _nextRequest
    , _previousRequest
    ) where

import Prelude
import RequestManager.SortType (SortType)
import RequestManager.PageKind (PageKind)
import Effect.Promise (class Deferred, Promise)
import RequestManager.RequestResult as RequestResult
import Requests.SortedConstructedMolecules (request)

import RequestManager.RequestManager.Internal.RequestManager.Internal.Utils
    as Utils

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

_nextRequest
    :: Deferred
    => SortedConstructedMolecules
    -> Promise RequestResult.RequestResult

_nextRequest
    (SortedConstructedMolecules
        { _url: url
        , _database: database
        , _moleculeKey: moleculeKey
        , _moleculeCollection: moleculeCollection
        , _constructedMoleculeCollection: constructedMoleculeCollection
        , _positionMatrixCollection: positionMatrixCollection
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
        pure (RequestResult.SortedConstructedMolecules result)

_previousRequest
    :: Deferred
    => SortedConstructedMolecules
    -> Promise RequestResult.RequestResult

_previousRequest
    (SortedConstructedMolecules
        { _url: url
        , _database: database
        , _moleculeKey: moleculeKey
        , _moleculeCollection: moleculeCollection
        , _constructedMoleculeCollection: constructedMoleculeCollection
        , _positionMatrixCollection: positionMatrixCollection
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
            , pageIndex: Utils.previousPageIndex _pageIndex
            , numEntriesPerPage
            , ignoredCollections
            , sortedCollection
            , sortType: Utils.toRequestSortType sortType
            }
        pure (RequestResult.SortedConstructedMolecules result)
