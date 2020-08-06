module RequestManager.RequestManager.Internal.Props.Internal.BackButton.Internal.UnsortedBuildingBlocks
    ( backButtonProps
    ) where

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

import RequestManager.RequestResult (RequestResult (UnsortedBuildingBlocks))
import Requests.UnsortedBuildingBlocks as Request
import Data.Array as Array


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
        , request: RequestResult.UnsortedBuildingBlocks request
        , onClick
        }
  where
    pageIndex = Utils.previousPageIndex _pageIndex
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

    onClick dispatch = do
        result <- request

        let
            (Result { valueCollections, molecules, pageKind' }) =
                result

            payload = updateMoleculePage
                { columns:
                    Array.concat [[moleculeKey], valueCollections]
                , moleculeKey
                , molecules
                , pageIndex
                , pageKind: fromRequest pageKind'
                }

        pure (dispatch (createAction payload))

