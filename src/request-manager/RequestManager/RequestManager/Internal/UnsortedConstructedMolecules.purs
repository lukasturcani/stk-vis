module RequestManager.RequestManager.Internal.RequestManager.UnsortedConstructedMolecules
    ( UnsortedConstructedMolecules (..)
    , _pageKind
    , _nextRequest
    , _previousRequest
    ) where

import Prelude
import RequestManager.PageKind (PageKind)
import Effect.Promise (class Deferred, Promise)
import RequestManager.RequestResult as RequestResult
import Requests.UnsortedConstructedMolecules (request)

import RequestManager.RequestManager.Internal.RequestManager.Internal.Utils
    as Utils

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
    }

_pageKind :: UnsortedConstructedMolecules -> PageKind
_pageKind (UnsortedConstructedMolecules { _pageKind: pageKind })
    = pageKind

_nextRequest
    :: Deferred
    => UnsortedConstructedMolecules
    -> Promise RequestResult.RequestResult

_nextRequest
    (UnsortedConstructedMolecules
        { _url: url
        , _database: database
        , _moleculeKey: moleculeKey
        , _moleculeCollection: moleculeCollection
        , _constructedMoleculeCollection: constructedMoleculeCollection
        , _positionMatrixCollection: positionMatrixCollection
        , _pageIndex
        , _numEntriesPerPage: numEntriesPerPage
        , _ignoredCollections: ignoredCollections
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
            }
        pure (RequestResult.UnsortedConstructedMolecules result)

_previousRequest
    :: Deferred
    => UnsortedConstructedMolecules
    -> Promise RequestResult.RequestResult

_previousRequest
    (UnsortedConstructedMolecules
        { _url: url
        , _database: database
        , _moleculeKey: moleculeKey
        , _moleculeCollection: moleculeCollection
        , _constructedMoleculeCollection: constructedMoleculeCollection
        , _positionMatrixCollection: positionMatrixCollection
        , _pageIndex
        , _numEntriesPerPage: numEntriesPerPage
        , _ignoredCollections: ignoredCollections
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
            }
        pure (RequestResult.UnsortedConstructedMolecules result)
