module RequestManager.RequestManager.Internal.Props.Internal.BackButton.Internal.SortedBuildingBlocks
    ( backButtonProps
    ) where

import Prelude

import RequestManager.RequestManager.Internal.RequestManager.SortedBuildingBlocks
    ( SortedBuildingBlocks (SortedBuildingBlocks)
    )

import RequestManager.RequestManager.Internal.Props.Internal.BackButton.Internal.Props
    ( BackButtonProps (..)
    )

import RequestManager.RequestManager.Internal.Props.Internal.BackButton.Internal.Utils
    ( disabled
    , previousPageIndex
    , showRefreshedSnackbar
    , errorSnackbar
    ) as Utils

import RequestManager.PageKind (fromRequest)
import RequestManager.SortType (toRequest)

import RequestManager.UpdateMoleculePage
    ( UpdateMoleculePage
    , updateMoleculePage
    )

import Requests.SortedBuildingBlocks as Request
import Data.Array as Array
import Effect.Promise (class Deferred, Promise, catch)
import Effect.Unsafe (unsafePerformEffect)
import Effect.Uncurried (runEffectFn1)


backButtonProps
    :: forall a
    .  (UpdateMoleculePage -> a)
    -> SortedBuildingBlocks
    -> BackButtonProps a

backButtonProps
    createAction
    (SortedBuildingBlocks
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
        , constructedMoleculeCollection
        , positionMatrixCollection
        , pageIndex
        , numEntriesPerPage
        , ignoredCollections
        , sortedCollection
        , sortType: toRequest sortType
        }

    onClick
        :: Deferred
        => DispatchAction a
        -> Snackbars
        -> Promise Unit

    onClick dispatch snackbars = catch
        (_onClick dispatch snackbars.success)
        (Utils.errorSnackbar snackbars pageKind)

    _onClick
        :: Deferred
        => DispatchAction a
        -> Snackbar
        -> Promise Unit

    _onClick dispatch snackbar = do
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

        _ <- pure (unsafePerformEffect
            (Utils.showRefreshedSnackbar
                (pageIndex == _pageIndex)
                snackbar
            )
        )

        pure (unsafePerformEffect
            (runEffectFn1 dispatch (createAction payload))
        )
