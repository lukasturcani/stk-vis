module RequestManager.Payload
    ( Payload (..)
    , initializeUnsortedAll
    , initializeUnsortedBuildingBlocks
    ) where

import RequestManager.InitializeUnsortedAll
    ( InitializeUnsortedAll
    )

import RequestManager.InitializeUnsortedBuildingBlocks
    ( InitializeUnsortedBuildingBlocks
    )

data Payload
    = InitializeUnsortedAll InitializeUnsortedAll
    | InitializeUnsortedBuildingBlocks InitializeUnsortedBuildingBlocks

initializeUnsortedAll :: InitializeUnsortedAll -> Payload
initializeUnsortedAll = InitializeUnsortedAll

initializeUnsortedBuildingBlocks
    :: InitializeUnsortedBuildingBlocks -> Payload

initializeUnsortedBuildingBlocks = InitializeUnsortedBuildingBlocks
