module RequestManager.RequestManager.Internal.Props.Internal.NextButton.Internal.UnsortedConstructedMolecules
    ( nextButtonProps
    ) where

import Prelude

import RequestManager.RequestManager.Internal.RequestManager.UnsortedConstructedMolecules
    ( UnsortedConstructedMolecules (UnsortedConstructedMolecules)
    )

import RequestManager.RequestManager.Internal.Props.Internal.NextButton.Internal.Props
    ( NextButtonProps (..)
    , DispatchAction
    , Snackbars
    )

import RequestManager.RequestManager.Internal.Props.Internal.NextButton.Internal.Utils
    ( lastPage
    , nextPageIndex
    , pageRefreshed
    ) as Utils

import RequestManager.PageKind (fromRequest)

import RequestManager.UpdateMoleculePage
    ( UpdateMoleculePage
    , updateMoleculePage
    )

import Requests.UnsortedConstructedMolecules as Request
import Data.Array as Array
import Effect.Promise (class Deferred, Promise)
import Effect (Effect)


nextButtonProps
    :: forall a
    .  (UpdateMoleculePage -> a)
    -> UnsortedConstructedMolecules
    -> NextButtonProps a

nextButtonProps
    createAction
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
        , constructedMoleculeCollection
        , positionMatrixCollection
        , pageIndex
        , numEntriesPerPage
        , ignoredCollections
        }

    onClick
        :: Deferred
        => DispatchAction a
        -> Snackbars
        -> Promise (Effect Unit)

    onClick dispatch snackbars = do
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

        _ <- pure (Utils.pageRefreshed
            (pageIndex == _pageIndex)
            snackbars.success
        )

        pure (dispatch (createAction payload))
