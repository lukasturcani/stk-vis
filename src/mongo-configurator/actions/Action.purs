module MongoConfigurator.Action
    ( Action
    , updateFields
    , initializeSortedAll
    , initializeSortedBuildingBlocks
    , initializeSortedConstructedMolecules
    , initializeUnsortedAll
    , initializeUnsortedBuildingBlocks
    , initializeUnsortedConstructedMolecules
    ) where

import MongoConfigurator.UpdateFields.UpdateFields (UpdateFields)

import MongoConfigurator.InitializeMoleculeBrowser.SortedAll
    ( SortedAll
    )

import MongoConfigurator.InitializeMoleculeBrowser.SortedBuildingBlocks
    ( SortedBuildingBlocks
    )

import MongoConfigurator.InitializeMoleculeBrowser.SortedConstructedMolecules
    ( SortedConstructedMolecules
    )

import MongoConfigurator.InitializeMoleculeBrowser.UnsortedAll
    ( UnsortedAll
    )

import MongoConfigurator.InitializeMoleculeBrowser.UnsortedBuildingBlocks
    ( UnsortedBuildingBlocks
    )

import MongoConfigurator.InitializeMoleculeBrowser.UnsortedConstructedMolecules
    ( UnsortedConstructedMolecules
    )

import MongoConfigurator.Payload (Payload, updateFields) as Payload

type Action =
    { type    :: String
    , payload :: Payload.Payload
    }

updateFields :: UpdateFields -> Action
updateFields data' =
    { type: "UPDATE_FIELDS"
    , payload: Payload.updateFields data'
    }

initializeSortedAll :: InitializeSortedAll -> Action
initializeSortedAll payload =
    { type: "INITIALIZE_SORTED_ALL"
    , payload: Payload.initializeSortedAll payload
    }

initializeSortedBuildingBlocks
    :: InitializeSortedBuildingBlocks -> Action
initializeSortedBuildingBlocks payload =
    { type: "INITIALIZE_SORTED_BUILDING_BLOCKS"
    , payload: Payload.initializeSortedBuildingBlocks payload
    }

initializeSortedConstructedMolecules
    :: InitializeSortedConstructedMolecules -> Action
initializeSortedConstructedMolecules payload =
    { type: "INITIALIZE_SORTED_CONSTRUCTED_MOLECULES"
    , payload: Payload.initializeSortedConstructedMolecules payload
    }

initializeUnsortedAll :: InitializeUnsortedAll -> Action
initialiezUnsortedAll payload =
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

