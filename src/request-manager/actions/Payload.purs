module RequestManager.Payload
    ( Payload (..)
    , initializeUnsortedAll
    ) where

import RequestManager.InitializeUnsortedAll
    ( InitializeUnsortedAll
    )

data Payload
    = InitializeUnsortedAll InitializeUnsortedAll

initializeUnsortedAll :: InitializeUnsortedAll -> Payload
initializeUnsortedAll = InitializeUnsortedAll
