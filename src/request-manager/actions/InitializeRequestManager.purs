module RequestManager.InitializeRequestManager
    ( InitializeRequestManager
    , initializeRequestManager
    , requestManager
    ) where

import RequestManager.RequestManager (RequestManager)

data InitializeRequestManager = InitializeRequestManager
    { _requestManager :: RequestManager
    }

initializeRequestManager :: RequestManager -> InitializeRequestManager
initializeRequestManager requestManager' = InitializeRequestManager
    { _requestManager: requestManager'
    }

requestManager :: InitializeRequestManager -> RequestManager
requestManager (InitializeRequestManager { _requestManager }) =
    _requestManager
