module StkVis.Action
    ( Action
    , updateMoleculePage
    , initializeUnsortedAll
    , initializeUnsortedBuildingBlocks
    , initializeUnsortedConstructedMolecules
    ) where

import StkVis.UpdateMoleculePage (UpdateMoleculePage)

import StkVis.Payload
    ( Payload
    , updateFields
    , updateMoleculePage
    ) as Payload

type Action =
    { type    :: String
    , payload :: Payload.Payload
    }

updateMoleculePage :: UpdateMoleculePage -> Action
updateMoleculePage payload =
    { type: "UPDATE_MOLECULE_PAGE"
    , payload: Payload.updateMoleculePage payload
    }

initializeUnsortedAll :: InitializeUnsortedAll -> Action
initializeUnsortedAll payload =
    { type: "INITIALIZE_UNSORTED_ALL_MOLECULE_BROWSER"
    , payload: Payload.initializeUnsortedAll
    }

initializeUnsortedBuildingBlocks
    :: InitializeUnsortedBuildingBlocks
    -> Action

initializeUnsortedBuildingBlocks payload =
    { type: "INITIALIZE_UNSORTED_BUILDING_BLOCKS_MOLECULE_BROWSER"
    , payload: Payload.initializeUnsortedBuildingBlocks
    }

initializeUnsortedConstructedMolecules
    :: InitializeUnsortedConstructedMolecules
    -> Action

initializeUnsortedConstructedMolecules payload =
    { type: "INITIALIZE_UNSORTED_CONSTRUCTED_MOLECULES_MOLECULE_BROWSER"
    , payload: Payload.initializeUnsortedConstructedMolecules
    }

