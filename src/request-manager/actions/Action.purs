module RequestManager.Action
    ( Action
    , initializeUnsortedAll
    , initializeUnsortedBuildingBlocks
    , initializeUnsortedConstructedMolecules
    , setUnsorted
    , setSorted
    , updateMoleculePage
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

import RequestManager.UpdateMoleculePage
    ( UpdateMoleculePage
    )

import RequestManager.SetUnsorted (SetUnsorted)
import RequestManager.SetSorted (SetSorted)

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

setUnsorted :: SetUnsorted -> Action
setUnsorted payload =
    { type: "SET_UNSORTED"
    , payload: Payload.setUnsorted payload
    }

setSorted :: SetSorted -> Action
setSorted payload =
    { type: "SET_SORTED"
    , payload: Payload.setSorted payload
    }

updateMoleculePage :: UpdateMoleculePage -> Action
updateMoleculePage payload =
    { type: "UPDATE_MOLECULE_PAGE"
    , payload: Payload.updateMoleculePage payload
    }
