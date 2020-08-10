module MoleculeBrowser.Payload
    ( Payload (..)
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
    , initializeMongoConfigurator
    ) where

import Prelude

import MoleculeBrowser.UpdateMoleculePage
    ( UpdateMoleculePage
    )

import MoleculeBrowser.InitializeMolecules
    ( InitializeMolecules
    )

import MoleculeBrowser.SetSorted
    ( SetSorted
    , setSorted
    ) as Browser

import RequestManager.SetSorted
    ( SetSorted
    ) as Manager

import MoleculeBrowser.SetUnsorted
    ( SetUnsorted
    , setUnsorted
    ) as Browser

import RequestManager.SetUnsorted
    ( SetUnsorted
    ) as Manager

import MoleculeBrowser.InitializeMoleculeBrowser.UnsortedAll
    ( InitializeUnsortedAll
    , initializeUnsortedAll
    ) as Browser

import MongoConfigurator.InitializeMoleculeBrowser.UnsortedAll
    ( InitializeUnsortedAll
    ) as Configurator

import MoleculeBrowser.InitializeMoleculeBrowser.UnsortedBuildingBlocks
    ( InitializeUnsortedBuildingBlocks
    , initializeUnsortedBuildingBlocks
    ) as Browser

import MongoConfigurator.InitializeMoleculeBrowser.UnsortedBuildingBlocks
    ( InitializeUnsortedBuildingBlocks
    ) as Configurator

import MoleculeBrowser.InitializeMoleculeBrowser.UnsortedConstructedMolecules
    ( InitializeUnsortedConstructedMolecules
    , initializeUnsortedConstructedMolecules
    ) as Browser

import MongoConfigurator.InitializeMoleculeBrowser.UnsortedConstructedMolecules
    ( InitializeUnsortedConstructedMolecules
    ) as Configurator

import MoleculeBrowser.InitializeMoleculeBrowser.SortedAll
    ( InitializeSortedAll
    ) as MoleculeBrowser

import MoleculeBrowser.InitializeMoleculeBrowser.SortedBuildingBlocks
    ( InitializeSortedBuildingBlocks
    ) as MoleculeBrowser

import MoleculeBrowser.InitializeMoleculeBrowser.SortedConstructedMolecules
    ( InitializeSortedConstructedMolecules
    ) as MoleculeBrowser

import MoleculeBrowser.InitializeMongoConfigurator
    ( InitializeMongoConfigurator
    )

import MoleculeBrowser.SelectMolecule
    ( SelectMolecule
    , selectMolecule
    ) as Browser

import Molecules.SelectMolecule
    ( SelectMolecule
    ) as Molecules

data Payload
    = UpdateMoleculePage UpdateMoleculePage
    | InitializeMolecules InitializeMolecules
    | SetSorted Browser.SetSorted
    | SetUnsorted Browser.SetUnsorted
    | InitializeUnsortedAllMoleculeBrowser
        Browser.InitializeUnsortedAll
    | InitializeUnsortedBuildingBlocksMoleculeBrowser
        Browser.InitializeUnsortedBuildingBlocks
    | InitializeUnsortedConstructedMoleculesMoleculeBrowser
        Browser.InitializeUnsortedConstructedMolecules
    | InitializeSortedAllMoleculeBrowser
        MoleculeBrowser.InitializeSortedAll
    | InitializeSortedBuildingBlocksMoleculeBrowser
        MoleculeBrowser.InitializeSortedBuildingBlocks
    | InitializeSortedConstructedMoleculesMoleculeBrowser
        MoleculeBrowser.InitializeSortedConstructedMolecules
    | SelectMolecule Browser.SelectMolecule
    | InitializeMongoConfigurator InitializeMongoConfigurator

updateMoleculePage :: UpdateMoleculePage -> Payload
updateMoleculePage = UpdateMoleculePage

initializeMolecules :: InitializeMolecules -> Payload
initializeMolecules = InitializeMolecules

setSorted :: Manager.SetSorted -> Payload
setSorted = SetSorted <<< Browser.setSorted

setUnsorted :: Manager.SetUnsorted -> Payload
setUnsorted = SetUnsorted <<< Browser.setUnsorted

initializeSortedAllMoleculeBrowser
    :: MoleculeBrowser.InitializeSortedAll
    -> Payload

initializeSortedAllMoleculeBrowser
    = InitializeSortedAllMoleculeBrowser

initializeSortedBuildingBlocksMoleculeBrowser
    :: MoleculeBrowser.InitializeSortedBuildingBlocks
    -> Payload

initializeSortedBuildingBlocksMoleculeBrowser
    = InitializeSortedBuildingBlocksMoleculeBrowser

initializeSortedConstructedMoleculesMoleculeBrowser
    :: MoleculeBrowser.InitializeSortedConstructedMolecules
    -> Payload

initializeSortedConstructedMoleculesMoleculeBrowser
    = InitializeSortedConstructedMoleculesMoleculeBrowser

initializeUnsortedAllMoleculeBrowser
    :: Configurator.InitializeUnsortedAll
    -> Payload

initializeUnsortedAllMoleculeBrowser
    = InitializeUnsortedAllMoleculeBrowser
    <<< Browser.initializeUnsortedAll

initializeUnsortedBuildingBlocksMoleculeBrowser
    :: Configurator.InitializeUnsortedBuildingBlocks
    -> Payload

initializeUnsortedBuildingBlocksMoleculeBrowser
    = InitializeUnsortedBuildingBlocksMoleculeBrowser
        <<< Browser.initializeUnsortedBuildingBlocks

initializeUnsortedConstructedMoleculesMoleculeBrowser
    :: Configurator.InitializeUnsortedConstructedMolecules
    -> Payload

initializeUnsortedConstructedMoleculesMoleculeBrowser
    = InitializeUnsortedConstructedMoleculesMoleculeBrowser
        <<< Browser.initializeUnsortedConstructedMolecules

selectMolecule :: Molecules.SelectMolecule -> Payload
selectMolecule = SelectMolecule <<< Browser.selectMolecule

initializeMongoConfigurator :: InitializeMongoConfigurator -> Payload
initializeMongoConfigurator = InitializeMongoConfigurator
