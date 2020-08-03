module RequestManager.Payload
    ( Payload (..)
    , initializeUnsortedAll
    ) where

import RequestManager.InitializeUnsortedAll
    ( InitializeUnsortedAll
    , UnsortedAllData
    , initializeUnsortedAll
    )

data Payload
    = InitializeUnsortedAll InitializeUnsortedAll

initializeUnsortedAll :: InitializeUnsortedAll -> Payload
initializeUnsortedAll = InitializeUnsortedAll
