module MongoConfigurator.Action
    ( Action
    , updateFields
    ) where

import MongoConfigurator.UpdateFields.UpdateFields (UpdateFields)
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
    :: InitializeUnsortedConstructedMolecules
    -> Action

initializeUnsortedConstructedMolecules payload =
    { type: "INITIALIZE_UNSORTED_CONSTRUCTED_MOLECULES"
    , payload: Payload.initializeUnsortedConstructedMolecules payload
    }
