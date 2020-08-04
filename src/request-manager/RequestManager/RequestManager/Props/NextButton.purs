module RequestManager.RequestManager.Internal.Props.Internal.NextButton
    ( NextButtonProps
    , nextButtonProps
    ) where

import RequestManager.RequestManager.Internal.RequestManager
    ( RequestManager
    , _pageKind
    )

import RequestManager.PageKind (PageKind (..))

data NextButtonProps = NextButtonProps
    { lastPage :: Boolean
    }

nextButtonProps :: RequestManager -> NextButtonProps
nextButtonProps manager = NextButtonProps
    { lastPage: _lastPage (_pageKind manager)
    }

_lastPage :: PageKind -> Boolean
_lastPage LastComplete   = true
_lastPage LastIncomplete = true
_lastPage OnlyComplete   = true
_lastPage OnlyIncomplete = true
_lastPage _              = false
