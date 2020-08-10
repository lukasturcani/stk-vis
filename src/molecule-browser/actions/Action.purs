module MoleculeBrowser.Action
    ( Action
    , updateMoleculePage
    , initializeMolecules
    , setSorted
    , setUnsorted
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

import MongoConfigurator.InitializeMoleculeBrowser.UnsortedBuildingBlocks
    ( InitializeUnsortedBuildingBlocks
    ) as Configurator

import MongoConfigurator.InitializeMoleculeBrowser.UnsortedConstructedMolecules
    ( InitializeUnsortedConstructedMolecules
    ) as Configurator

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

initializeUnsortedAllMoleculeBrowser
    :: Configurator.InitializeUnsortedAll
    -> Action

initializeUnsortedAllMoleculeBrowser payload =
    { type: "INITIALIZE_UNSORTED_ALL_MOLECULE_BROWSER"
    , payload: Payload.initializeUnsortedAllMoleculeBrowser payload
    }

initializeUnsortedBuildingBlocksMoleculeBrowser
    :: Configurator.InitializeUnsortedBuildingBlocks
    -> Action

initializeUnsortedBuildingBlocksMoleculeBrowser payload =
    { type: "INITIALIZE_UNSORTED_BUILDING_BLOCKS_MOLECULE_BROWSER"
    , payload: Payload.initializeUnsortedBuildingBlocksMoleculeBrowser
        payload
    }

initializeUnsortedConstructedMoleculesMoleculeBrowser
    :: Configurator.InitializeUnsortedConstructedMolecules
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

initializeMongoConfigurator :: InitializeMongoConfigurator -> Action
initializeMongoConfigurator payload =
    { type: "INITIALIZE_MONGO_CONFIGURATOR"
    , payload: Payload.initializeMongoConfigurator payload
    }
