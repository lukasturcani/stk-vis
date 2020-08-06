module RequestManager.RequestManager.Internal.Props.Internal.BackButton.Internal.UnsortedAll
    ( backButtonProps
    ) where

import RequestManager.RequestManager.Internal.RequestManager.UnsortedAll
    ( UnsortedAll (UnsortedAll)
    )

import RequestManager.RequestManager.Internal.Props.Internal.BackButton.Internal.Props
    ( BackButtonProps (..)
    )

import RequestManager.InitializeUnsortedAll (InitializeUnsortedAll)


backButtonProps
    :: forall a
    .  (InitializeUnsortedAll -> a)
    -> UnsortedAll
    -> BackButtonProps a

backButtonProps
    createAction
    (UnsortedAll
        { _url
        , _database
        , _moleculeKey
        , _moleculeCollection
        , _positionMatrixCollection
        , _buildingBlockPositionMatrixCollection
        , _pageIndex
        , _numEntriesPerPage
        , _ignoredCollections
        , _pageKind
        }
    )
    =

_request
    :: Deferred => UnsortedAll -> Promise RequestResult.RequestResult

_request
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
    = do
        result <- request
            { url
            , database
            , moleculeKey
            , moleculeCollection
            , positionMatrixCollection
            , buildingBlockPositionMatrixCollection
            , pageIndex: Utils.previousPageIndex _pageIndex
            , numEntriesPerPage
            , ignoredCollections
            }
        pure (RequestResult.UnsortedAll result)

backButtonProps helpers manager = BackButtonProps
        { disabled: _disabled (_pageKind manager)
        , request
        , onClick
        }
  where
    request :: Deferred => Promise RequestResult
    request = _request manager

    onClick :: Deferred => (a -> Effect Unit) -> Promise (Effect Unit)
    onClick dispatch = do
       result <- request
       pure (dispatch (_toAction helpers manager result))
