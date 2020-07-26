module RequestManager.InitializeRequestManager
    ( InitializeRequestManager
    , initializeRequestManager
    ) where

import RequestManager.RequestManager (RequestManager)

data InitializeRequestManager = InitializeRequestManager
    { _requestManager :: RequestManager
    }

initializeRequestManager :: RequestManager -> InitializeRequestManager
initializeRequestManager requestManager = InitializeRequestManager
    { _requestManager: requestManager
    }
