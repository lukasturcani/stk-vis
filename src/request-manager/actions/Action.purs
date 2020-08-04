module RequestManager.Action
    ( Action
    , initializeUnsortedAll
    , initializeUnsortedBuildingBlocks
    , initializeUnsortedConstructedMolecules
    , initializeSortedAll
    ) where

import RequestManager.Payload as Payload

import RequestManager.InitializeUnsortedAll
    ( InitializeUnsortedAll
    )

import RequestManager.InitializeUnsortedBuildingBlocks
    ( InitializeUnsortedBuildingBlocks
    )

import RequestManager.InitializeUnsortedConstructedMolecules
    ( InitializeUnsortedConstructedMolecules
    )

import RequestManager.InitializeSortedAll
    ( InitializeSortedAll
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

initializeUnsortedBuildingBlocks
    :: InitializeUnsortedBuildingBlocks -> Action

initializeUnsortedBuildingBlocks payload =
    { type: "INITIALIZE_UNSORTED_BUILDING_BLOCKS"
    , payload: Payload.initializeUnsortedBuildingBlocks payload
    }

initializeUnsortedConstructedMolecules
    :: InitializeUnsortedConstructedMolecules -> Action

initializeUnsortedConstructedMolecules payload =
    { type: "INITIALIZE_UNSORTED_CONSTRUCTED_MOLECULES"
    , payload: Payload.initializeUnsortedConstructedMolecules payload
    }

initializeSortedAll :: InitializeSortedAll -> Action
initializeSortedAll payload =
    { type: "INITIALIZE_SORTED_ALL"
    , payload: Payload.initializeSortedAll payload
    }
