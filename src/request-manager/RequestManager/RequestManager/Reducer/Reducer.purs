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

import RequestManager.RequestManager.Internal.Reducer.Internal.InitializeUnsortedConstructedMolecules
    ( initializeUnsortedConstructedMolecules
    )

import RequestManager.RequestManager.Internal.Reducer.Internal.InitializeSortedAll
    ( initializeSortedAll
    )

import RequestManager.RequestManager.Internal.Reducer.Internal.InitializeSortedBuildingBlocks
    ( initializeSortedBuildingBlocks
    )

import RequestManager.RequestManager.Internal.Reducer.Internal.InitializeSortedConstructedMolecules
    ( initializeSortedConstructedMolecules
    )

import RequestManager.RequestManager.Internal.Reducer.Internal.SetUnsorted
    ( setUnsorted
    )

import RequestManager.RequestManager.Internal.Reducer.Internal.SetSorted
    ( setSorted
    )

import RequestManager.RequestManager.Internal.Reducer.Internal.UpdateMoleculePage
    ( updateMoleculePage
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

reducer
    requestManager
    ({ payload: (InitializeUnsortedConstructedMolecules payload) })
    = initializeUnsortedConstructedMolecules requestManager payload

reducer
    requestManager
    ({ payload: (InitializeSortedAll payload) })
    = initializeSortedAll requestManager payload

reducer
    requestManager
    ({ payload: (InitializeSortedBuildingBlocks payload) })
    = initializeSortedBuildingBlocks requestManager payload

reducer
    requestManager
    ({ payload: (InitializeSortedConstructedMolecules payload) })
    = initializeSortedConstructedMolecules requestManager payload

reducer
    requestManager
    ({ payload: (SetUnsorted payload) })
    = setUnsorted requestManager payload

reducer
    requestManager
    ({ payload: (SetSorted payload) })
    = setSorted requestManager payload

reducer
    requestManager
    ({ payload: (UpdateMoleculePage payload) })
    = updateMoleculePage requestManager payload
