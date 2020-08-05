module RequestManager.RequestManager.Internal.Props.Internal.BackButton
    ( BackButtonProps
    , backButtonProps
    ) where

import RequestManager.RequestManager.Internal.RequestManager
    ( RequestManager
    , _pageKind
    )

import RequestManager.RequestResult (RequestResult)
import RequestManager.PageKind (PageKind (..))
import Effect.Promise (class Deferred, Promise)

data BackButtonProps = BackButtonProps
    { disabled :: Boolean
    , request  :: Deferred => Promise RequestResult
    }

backButtonProps :: RequestManager -> BackButtonProps
backButtonProps manager = BackButtonProps
        { disabled: _disabled (_pageKind manager)
        , request: _request manager
        }

_disabled :: PageKind -> Boolean
_disabled First          = true
_disabled OnlyComplete   = true
_disabled OnlyIncomplete = true
_disabled _              = false

_request :: Deferred => RequestManager -> Promise RequestResult

_request (UnsortedAll manager)
    = UnsortedAll._previousRequest manager

_request (UnsortedBuildingBlocks manager)
    = UnsortedBuildingBlocks._previousRequest manager

_request (UnsortedConstructedMolecules manager)
    = UnsortedConstructedMolecules._previousRequest manager

_request (SortedAll manager)
    = SortedAll._previousRequest manager

_request (SortedBuildingBlocks manager)
    = SortedBuildingBlocks._previousRequest manager

_request (SortedConstructedMolecules manager)
    = SortedConstructedMolecules._previousRequest manager
