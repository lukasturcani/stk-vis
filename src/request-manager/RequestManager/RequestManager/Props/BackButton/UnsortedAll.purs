module RequestManager.RequestManager.Internal.Props.Internal.BackButton.Internal.UnsortedAll
    ( backButtonProps
    ) where

import RequestManager.RequestManager.Internal.RequestManager.UnsortedAll
    ( UnsortedAll (UnsortedAll)
    )

import RequestManager.RequestManager.Internal.Props.Internal.BackButton.Internal.Props
    ( BackButtonProps (..)
    )

import RequestManager.RequestManager.Internal.Props.Internal.BackButton.Internal.Utils
    ( disabled
    , previousPageIndex
    ) as Utils

import RequestManager.PageKind (fromRequest)

import RequestManager.UpdatedMoleculePage
    ( UpdateMoleculePage
    , updateMoleculePage
    )

import RequestManager.RequestResult (RequestResult (UnsortedAll))
import Requests.UnsortedAll as Request
import Data.Array as Array


backButtonProps
    :: forall a
    .  (UpdateMoleculePage -> a)
    -> UnsortedAll
    -> BackButtonProps a

backButtonProps
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
    = BackButtonProps
        { disabled: Utils.disabled pageKind
        , request: RequestResult.UnsortedAll request
        , onClick
        }
  where
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

    onClick dispatch = do

       let pageIndex = Utils.previousPageIndex _pageIndex

        Result { valueCollections, molecules, pageKind' } <- request

        let payload = updateMoleculePage
            { columns: Array.concat [[moleculeKey], valueCollections]
            , moleculeKey
            , molecules
            , pageIndex
            , pageKind: fromRequest pageKind'
            }

        pure (dispatch (createAction payload))
