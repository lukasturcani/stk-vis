module RequestManager.RequestManager.Internal.Reducer
    ( reducer
    ) where

import RequestManager.Action (Action)
import RequestManager.Payload (Payload (..))

import RequestManager.RequestManager.Internal.RequestManager
    ( RequestManager
    )

import RequestManager.RequestManager.Internal.Reducer.Internal.InitializeUnsortedAll
    ( initializeUnsortedAll
    )

import RequestManager.RequestManager.Internal.Reducer.Internal.InitializeUnsortedBuildingBlocks
    ( initializeUnsortedBuildingBlocks
    )

reducer :: RequestManager -> Action -> RequestManager
reducer
    requestManager
    ({ payload: (InitializeUnsortedAll payload) })
    = initializeUnsortedAll requestManager payload

reducer
    requestManager
    ({ payload: (InitializeUnsortedBuildingBlocks payload) })
    = initializeUnsortedBuildingBlocks requestManager payload
