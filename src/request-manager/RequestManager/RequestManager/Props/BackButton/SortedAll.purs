module RequestManager.RequestManager.Internal.Props.Internal.BackButton.Internal.SortedAll
    ( backButtonProps
    ) where

import Prelude

import RequestManager.RequestManager.Internal.RequestManager.SortedAll
    ( SortedAll (SortedAll)
    )

import RequestManager.RequestManager.Internal.Props.Internal.BackButton.Internal.Props
    ( BackButtonProps (..)
    )

import RequestManager.RequestManager.Internal.Props.Internal.BackButton.Internal.Utils
    ( disabled
    , previousPageIndex
    ) as Utils

import RequestManager.PageKind (fromRequest)
import RequestManager.SortType (toRequest)

import RequestManager.UpdateMoleculePage
    ( UpdateMoleculePage
    , updateMoleculePage
    )

import Requests.SortedAll as Request
import Data.Array as Array
import Effect.Promise (class Deferred, Promise)
import Effect (Effect)


backButtonProps
    :: forall a
    .  (UpdateMoleculePage -> a)
    -> SortedAll
    -> BackButtonProps a

backButtonProps
    createAction
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
        , _pageKind: pageKind
        , _sortedCollection: sortedCollection
        , _sortType: sortType
        }
    )
    = BackButtonProps
        { disabled: Utils.disabled pageKind
        , onClick
        }
  where
    pageIndex = Utils.previousPageIndex _pageIndex

    request :: Deferred => Promise Request.Result
    request = Request.request
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
        , sortType: toRequest sortType
        }

    onClick :: Deferred => (a -> Effect Unit) -> Promise (Effect Unit)
    onClick dispatch = do
        result <- request

        let
            (Request.Result
                { valueCollections, molecules, pageKind: pageKind' }
            ) = result

            payload = updateMoleculePage
                { columns:
                    Array.concat [[moleculeKey], valueCollections]
                , moleculeKey
                , molecules
                , pageIndex
                , pageKind: fromRequest pageKind'
                , valueCollections
                }

        pure (dispatch (createAction payload))
