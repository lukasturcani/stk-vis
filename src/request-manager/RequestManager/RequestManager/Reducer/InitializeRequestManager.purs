module RequestManager.RequestManager.Internal.Reducer.Internal.InitializeRequestManager
    ( initializeRequestManager
    ) where

import RequestManager.RequestManager.Internal.RequestManager
    ( RequestManager (RequestManager)
    )

import RequestManager.InitializeRequestManager
    ( InitializeRequestManager
    )

initializeRequestManager
    :: RequestManager -> InitializeRequestManager -> RequestManager
initializeRequestManager _ payload = RequestManager
