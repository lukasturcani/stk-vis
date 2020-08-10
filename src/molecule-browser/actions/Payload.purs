module MoleculeBrowser.Payload
    ( Payload (..)
    , updateMoleculePage
    , initializeMolecules
    , setSorted
    , setUnsorted
    , initializeUnsortedAllMoleculeBrowser
    , initializeUnsortedBuildingBlocksMoleculeBrowser
    , initializeUnsortedConstructedMoleculesMoleculeBrowser
    , selectMolecule
    , initializeMongoConfigurator
    ) where

import Prelude

import RequestManager.UpdateMoleculePage
    ( UpdateMoleculePage
    )

import Molecules.InitializeMolecules
    ( InitializeMolecules
    )

import RequestManager.SetSorted
    ( SetSorted
    )

import RequestManager.SetUnsorted
    ( SetUnsorted
    )

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

import MongoConfigurator.InitializeMongoConfigurator
    ( InitializeMongoConfigurator
    )

import Molecules.SelectMolecule
    ( SelectMolecule
    )

data Payload
    = UpdateMoleculePage UpdateMoleculePage
    | InitializeMolecules InitializeMolecules
    | SetSorted SetSorted
    | SetUnsorted SetUnsorted
    | InitializeUnsortedAllMoleculeBrowser
        Browser.InitializeUnsortedAll
    | InitializeUnsortedBuildingBlocksMoleculeBrowser
        Browser.InitializeUnsortedBuildingBlocks
    | InitializeUnsortedConstructedMoleculesMoleculeBrowser
        Browser.InitializeUnsortedConstructedMolecules
    | SelectMolecule SelectMolecule
    | InitializeMongoConfigurator InitializeMongoConfigurator

updateMoleculePage :: UpdateMoleculePage -> Payload
updateMoleculePage = UpdateMoleculePage

initializeMolecules :: InitializeMolecules -> Payload
initializeMolecules = InitializeMolecules

setSorted :: SetSorted -> Payload
setSorted = SetSorted

setUnsorted :: SetUnsorted -> Payload
setUnsorted = SetUnsorted

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

selectMolecule :: SelectMolecule -> Payload
selectMolecule = SelectMolecule

initializeMongoConfigurator :: InitializeMongoConfigurator -> Payload
initializeMongoConfigurator = InitializeMongoConfigurator

