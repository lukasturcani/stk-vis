module RequestManager.Action
    ( Action
    , initializeRequestManager
    ) where

import RequestManager.RequestManager (RequestManager)

import RequestManager.Payload
    ( Payload (..)
    , initializeRequestManager
    ) as Payload

import RequestManager.InitializeRequestManager
    ( InitializeRequestManager
    )

type Action =
    { type    :: String
    , payload :: Payload.Payload
    }

initializeRequestManager :: InitializeRequestManager -> Action
initializeRequestManager initializeRequestManager' =
    { type: "INITIALIZE_REQUEST_MANAGER"
    , payload:
        Payload.initializeRequestManager initializeRequestManager'
    }
