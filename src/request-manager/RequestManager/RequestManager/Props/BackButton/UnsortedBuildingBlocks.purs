module RequestManager.RequestManager.Internal.Props.Internal.BackButton.Internal.UnsortedBuildingBlocks
    ( backButtonProps
    ) where

import Prelude

import RequestManager.RequestManager.Internal.RequestManager.UnsortedBuildingBlocks
    ( UnsortedBuildingBlocks (UnsortedBuildingBlocks)
    )

import RequestManager.RequestManager.Internal.Props.Internal.BackButton.Internal.Props
    ( BackButtonProps (..)
    )

import RequestManager.RequestManager.Internal.Props.Internal.BackButton.Internal.Utils
    ( disabled
    , previousPageIndex
    ) as Utils

import RequestManager.PageKind (fromRequest)

import RequestManager.UpdateMoleculePage
    ( UpdateMoleculePage
    , updateMoleculePage
    )

import RequestManager.RequestResult as RequestResult
import Requests.UnsortedBuildingBlocks as Request
import Data.Array as Array
import Effect.Promise (class Deferred, Promise)
import Effect (Effect)


backButtonProps
    :: forall a
    .  (UpdateMoleculePage -> a)
    -> UnsortedBuildingBlocks
    -> BackButtonProps a

backButtonProps
    createAction
    (UnsortedBuildingBlocks
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
    = BackButtonProps
        { disabled: Utils.disabled pageKind
        , request: request'
        , onClick
        }
  where
    pageIndex = Utils.previousPageIndex _pageIndex

    request' :: Deferred => Promise RequestResult.RequestResult
    request' = do
       result <- request
       pure $ RequestResult.UnsortedBuildingBlocks result

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
                }

        pure (dispatch (createAction payload))
