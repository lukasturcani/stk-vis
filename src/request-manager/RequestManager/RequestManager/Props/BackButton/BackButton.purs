module RequestManager.RequestManager.Internal.Props.Internal.BackButton
    ( BackButtonProps
    , ActionCreators
    , backButtonProps
    ) where

import Prelude

import RequestManager.RequestManager.Internal.RequestManager
    ( RequestManager (..)
    , _pageKind
    )

import RequestManager.RequestManager.Internal.RequestManager.UnsortedAll
    as UnsortedAll

import RequestManager.RequestManager.Internal.RequestManager.UnsortedBuildingBlocks
    as UnsortedBuildingBlocks

import RequestManager.RequestManager.Internal.RequestManager.UnsortedConstructedMolecules
    as UnsortedConstructedMolecules

import RequestManager.RequestManager.Internal.RequestManager.SortedAll
    as SortedAll

import RequestManager.RequestManager.Internal.RequestManager.SortedBuildingBlocks
    as SortedBuildingBlocks

import RequestManager.RequestManager.Internal.RequestManager.SortedConstructedMolecules
    as SortedConstructedMolecules

import RequestManager.RequestResult (RequestResult)
import RequestManager.PageKind (PageKind (..))
import Effect.Promise (class Deferred, Promise)
import Effect (Effect)

data BackButtonProps a = BackButtonProps
    { disabled :: Boolean
    , request  :: Deferred => Promise RequestResult
    , onClick
        :: Deferred => (a -> Effect Unit) -> Promise (Effect Unit)
    }

type ActionCreators a =
    { initializeUnsortedAll
        :: InitializeUnsortedAll -> a

    , initializeUnsortedBuildingBlocks
        :: InitializeUnsortedBuildingBlocks -> a

    , initializeUnsortedConstructedMolecules
        :: InitializeUnsortedConstructedMolecules -> a

    , initializeSortedAll
        :: InitializeSortedAll -> a

    , initializeSortedBuildingBlocks
        :: InitializeSortedBuildingBlocks -> a

    , initializeSortedConstructedMolecules
        :: InitializeSortedConstructedMolecules -> a
    }

backButtonProps
    :: forall a
    .  Helpers a
    -> RequestManager
    -> BackButtonProps a

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

_toAction
    :: forall a
    .  Helpers a
    -> RequestManager
    -> RequestResult
    -> a

_toAction helpers (UnsortedAll result)

_disabled :: PageKind -> Boolean
_disabled First          = true
_disabled OnlyComplete   = true
_disabled OnlyIncomplete = true
_disabled _              = false

_request :: Deferred => RequestManager -> Promise RequestResult

_request (UnsortedAll manager)
    = UnsortedAll._backRequest manager

_request (UnsortedBuildingBlocks manager)
    = UnsortedBuildingBlocks._backRequest manager

_request (UnsortedConstructedMolecules manager)
    = UnsortedConstructedMolecules._backRequest manager

_request (SortedAll manager)
    = SortedAll._backRequest manager

_request (SortedBuildingBlocks manager)
    = SortedBuildingBlocks._backRequest manager

_request (SortedConstructedMolecules manager)
    = SortedConstructedMolecules._backRequest manager
