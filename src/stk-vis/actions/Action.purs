module StkVis.Action
    ( Action
    , updateMoleculePage
    , initializeUnsortedAll
    , initializeUnsortedBuildingBlocks
    , initializeUnsortedConstructedMolecules
    ) where

import StkVis.UpdateMoleculePage (UpdateMoleculePage)
import StkVis.Payload as Payload

import StkVis.InitializeMoleculeBrowser.UnsortedAll
    ( InitializeUnsortedAll
    )
import StkVis.InitializeMoleculeBrowser.UnsortedBuildingBlocks
    ( InitializeUnsortedBuildingBlocks
    )
import StkVis.InitializeMoleculeBrowser.UnsortedConstructedMolecules
    ( InitializeUnsortedConstructedMolecules
    )

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
    , payload: Payload.initializeUnsortedAll payload
    }

initializeUnsortedBuildingBlocks
    :: InitializeUnsortedBuildingBlocks
    -> Action

initializeUnsortedBuildingBlocks payload =
    { type: "INITIALIZE_UNSORTED_BUILDING_BLOCKS_MOLECULE_BROWSER"
    , payload: Payload.initializeUnsortedBuildingBlocks payload
    }

initializeUnsortedConstructedMolecules
    :: InitializeUnsortedConstructedMolecules
    -> Action

initializeUnsortedConstructedMolecules payload =
    { type: "INITIALIZE_UNSORTED_CONSTRUCTED_MOLECULES_MOLECULE_BROWSER"
    , payload: Payload.initializeUnsortedConstructedMolecules payload
    }

