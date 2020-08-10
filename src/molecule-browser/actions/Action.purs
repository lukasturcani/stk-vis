module MoleculeBrowser.Action
    ( Action
    , updateMoleculePage
    , initializeMolecules
    , setSorted
    , setUnsorted
    , initializeSortedAllMoleculeBrowser
    , initializeSortedBuildingBlocksMoleculeBrowser
    , initializeSortedConstructedMoleculesMoleculeBrowser
    , initializeUnsortedAllMoleculeBrowser
    , initializeUnsortedBuildingBlocksMoleculeBrowser
    , initializeUnsortedConstructedMoleculesMoleculeBrowser
    , selectMolecule
    , selectMolecule_
    , initializeMongoConfigurator
    ) where

import MoleculeBrowser.UpdateMoleculePage
    ( UpdateMoleculePage
    )

import MoleculeBrowser.InitializeMolecules
    ( InitializeMolecules
    )

import RequestManager.SetSorted as SetSorted
import RequestManager.SetUnsorted as SetUnsorted

import MongoConfigurator.InitializeMoleculeBrowser.UnsortedAll
    ( InitializeUnsortedAll
    ) as Configurator

import MoleculeBrowser.InitializeMoleculeBrowser.UnsortedBuildingBlocks
    ( InitializeUnsortedBuildingBlocks
    ) as MoleculeBrowser

import MoleculeBrowser.InitializeMoleculeBrowser.UnsortedConstructedMolecules
    ( InitializeUnsortedConstructedMolecules
    ) as MoleculeBrowser

import MoleculeBrowser.InitializeMoleculeBrowser.SortedAll
    ( InitializeSortedAll
    ) as MoleculeBrowser

import MoleculeBrowser.InitializeMoleculeBrowser.SortedBuildingBlocks
    ( InitializeSortedBuildingBlocks
    ) as MoleculeBrowser

import MoleculeBrowser.InitializeMoleculeBrowser.SortedConstructedMolecules
    ( InitializeSortedConstructedMolecules
    ) as MoleculeBrowser

import Molecules.SelectMolecule as SelectMolecule

import MoleculeBrowser.InitializeMongoConfigurator
    ( InitializeMongoConfigurator
    )

import Molecules.Molecule (Molecule)
import MoleculeBrowser.Payload as Payload

type Action =
    { type    :: String
    , payload :: Payload.Payload
    }

updateMoleculePage :: UpdateMoleculePage -> Action
updateMoleculePage payload =
    { type: "UPDATE_MOLECULE_PAGE"
    , payload: Payload.updateMoleculePage payload
    }

initializeMolecules :: InitializeMolecules -> Action
initializeMolecules payload =
    { type: "INITIALIZE_MOLECULES"
    , payload: Payload.initializeMolecules payload
    }

setSorted :: SetSorted.SetSorted -> Action
setSorted payload =
    { type: "SET_SORTED"
    , payload: Payload.setSorted payload
    }

setUnsorted :: SetUnsorted.SetUnsorted -> Action
setUnsorted payload =
    { type: "SET_UNSORTED"
    , payload: Payload.setUnsorted payload
    }

initializeSortedAllMoleculeBrowser
    :: MoleculeBrowser.InitializeSortedAll
    -> Action

initializeSortedAllMoleculeBrowser payload =
    { type: "INITIALIZE_SORTED_ALL_MOLECULE_BROWSER"
    , payload: Payload.initializeSortedAllMoleculeBrowser payload
    }

initializeSortedBuildingBlocksMoleculeBrowser
    :: MoleculeBrowser.InitializeSortedBuildingBlocks
    -> Action

initializeSortedBuildingBlocksMoleculeBrowser payload =
    { type: "INITIALIZE_SORTED_BUILDING_BLOCKS_MOLECULE_BROWSER"
    , payload: Payload.initializeSortedBuildingBlocksMoleculeBrowser
        payload
    }

initializeSortedConstructedMoleculesMoleculeBrowser
    :: MoleculeBrowser.InitializeSortedConstructedMolecules
    -> Action

initializeSortedConstructedMoleculesMoleculeBrowser payload =
    { type: "INITIALIZE_SORTED_CONSTRUCTED_MOLECULES_MOLECULE_BROWSER"
    , payload:
        Payload.initializeSortedConstructedMoleculesMoleculeBrowser
            payload
    }

initializeUnsortedAllMoleculeBrowser
    :: Configurator.InitializeUnsortedAll
    -> Action

initializeUnsortedAllMoleculeBrowser payload =
    { type: "INITIALIZE_UNSORTED_ALL_MOLECULE_BROWSER"
    , payload: Payload.initializeUnsortedAllMoleculeBrowser payload
    }

initializeUnsortedBuildingBlocksMoleculeBrowser
    :: MoleculeBrowser.InitializeUnsortedBuildingBlocks
    -> Action

initializeUnsortedBuildingBlocksMoleculeBrowser payload =
    { type: "INITIALIZE_UNSORTED_BUILDING_BLOCKS_MOLECULE_BROWSER"
    , payload: Payload.initializeUnsortedBuildingBlocksMoleculeBrowser
        payload
    }

initializeUnsortedConstructedMoleculesMoleculeBrowser
    :: MoleculeBrowser.InitializeUnsortedConstructedMolecules
    -> Action

initializeUnsortedConstructedMoleculesMoleculeBrowser payload =
    { type: "INITIALIZE_UNSORTED_CONSTRUCTED_MOLECULES_MOLECULE_BROWSER"
    , payload:
        Payload.initializeUnsortedConstructedMoleculesMoleculeBrowser
            payload
    }

selectMolecule :: SelectMolecule.SelectMolecule -> Action
selectMolecule payload =
    { type: "SELECT_MOLECULE"
    , payload: Payload.selectMolecule payload
    }

selectMolecule_ :: Int -> Molecule -> Action
selectMolecule_ id molecule = selectMolecule
    (SelectMolecule.selectMolecule id molecule)

initializeMongoConfigurator :: InitializeMongoConfigurator -> Action
initializeMongoConfigurator payload =
    { type: "INITIALIZE_MONGO_CONFIGURATOR"
    , payload: Payload.initializeMongoConfigurator payload
    }
