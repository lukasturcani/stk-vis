module RequestManager.RequestManager.Internal.Props.Internal.BackButton.Internal.UnsortedAll
    ( backButtonProps
    ) where

import RequestManager.RequestManager.Internal.RequestManager.UnsortedAll
    ( UnsortedAll (UnsortedAll)
    )

import RequestManager.RequestManager.Internal.Props.Internal.BackButton.Internal.Props
    ( BackButtonProps (..)
    )

import RequestManager.RequestManager.Internal.Props.Internal.BackButton.Internal.Utils as Utils

import RequestManager.UpdatedMoleculePage
    ( UpdateMoleculePage
    , updateMoleculePage
    )

import Requests.UnsortedAll as Request


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
        , request
        , onClick
        }
  where
    request = Request.request
        {
        }
    onClick dispatch = do

       let pageIndex = Utils.previousPageIndex _pageIndex

        result <- request
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

        let payload = updateMoleculePage
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


_request :: Deferred => UnsortedAll -> Promise Request.Result
_request
    (UnsortedAll
    )
    = request
