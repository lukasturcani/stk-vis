module RequestManager.RequestManager.Internal.Props.Internal.NextButton.Internal.UnsortedAll
    ( nextButtonProps
    ) where

import Prelude

import RequestManager.RequestManager.Internal.RequestManager.UnsortedAll
    ( UnsortedAll (UnsortedAll)
    )

import RequestManager.RequestManager.Internal.Props.Internal.NextButton.Internal.Props
    ( NextButtonProps (..)
    , DispatchAction
    , Snackbars
    , Snackbar
    )

import RequestManager.RequestManager.Internal.Props.Internal.NextButton.Internal.Utils
    ( lastPage
    , nextPageIndex
    , showRefreshedSnackbar
    , errorSnackbar
    ) as Utils

import RequestManager.PageKind (fromRequest)

import RequestManager.UpdateMoleculePage
    ( UpdateMoleculePage
    , updateMoleculePage
    )

import Requests.UnsortedAll as Request
import Data.Array as Array
import Effect.Promise (class Deferred, Promise, catch)
import Effect.Unsafe (unsafePerformEffect)
import Effect.Uncurried (runEffectFn1)


nextButtonProps
    :: forall a
    .  (UpdateMoleculePage -> a)
    -> UnsortedAll
    -> NextButtonProps a

nextButtonProps
    createAction
    (UnsortedAll
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
        }
    )
    = NextButtonProps
        { lastPage: Utils.lastPage pageKind
        , onClick
        }
  where
    pageIndex = Utils.nextPageIndex pageKind _pageIndex

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
        }

    onClick
        :: Deferred
        => DispatchAction a
        -> Snackbars
        -> Promise Unit

    onClick dispatch snackbars = catch
        (_onClick dispatch snackbars.success)
        (Utils.errorSnackbar snackbars.error)

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
