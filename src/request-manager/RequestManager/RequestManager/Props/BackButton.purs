module RequestManager.RequestManager.Internal.Props.Internal.BackButton
    ( BackButtonProps
    , backButtonProps
    ) where

import RequestManager.RequestManager.Internal.RequestManager
    ( RequestManager
    , _pageKind
    )

import RequestManager.PageKind (PageKind (..))

data BackButtonProps = BackButtonProps
    { disabled :: Boolean
    }

backButtonProps :: RequestManager -> BackButtonProps
backButtonProps manager = BackButtonProps
        { disabled: _disabled (_pageKind manager)
        }

_disabled :: PageKind -> Boolean
_disabled First          = true
_disabled OnlyComplete   = true
_disabled OnlyIncomplete = true
_disabled _              = false
