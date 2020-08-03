module RequestManager.Action
    ( Action
    , initializeUnsortedAll
    ) where

import RequestManager.Payload
    ( Payload
    , initializeUnsortedAll
    ) as Payload

import RequestManager.InitializeUnsortedAll
    ( InitializeUnsortedAll
    )

type Action =
    { type    :: String
    , payload :: Payload.Payload
    }

initializeUnsortedAll :: InitializeUnsortedAll -> Action
initializeUnsortedAll payload =
    { type: "INITIALIZE_UNSORTED_ALL"
    , payload: Payload.initializeUnsortedAll payload
    }
