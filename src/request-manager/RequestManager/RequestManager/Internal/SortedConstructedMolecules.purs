module RequestManager.RequestManager.Internal.RequestManager.SortedConstructedMolecules
    ( SortedConstructedMolecules (..)
    , _pageKind
    , _nextRequest
    ) where

import Prelude
import RequestManager.SortType (SortType)
import RequestManager.PageKind (PageKind)
import Effect.Promise (class Deferred, Promise)
import RequestManager.RequestResult as RequestResult
import Requests.UnsortedAll (request)

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
        , _positionMatrixCollection: positionMatrixCollection
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
            , buildingBlockPositionMatrixCollection:
                "building_block_position_matrices"
            , pageIndex
            , numEntriesPerPage
            , ignoredCollections
            }
        pure (RequestResult.UnsortedAll result)
