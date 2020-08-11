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

import MoleculeBrowser.Initialize.UnsortedAll
    ( InitializeUnsortedAll
    ) as Browser

import MoleculeBrowser.Initialize.UnsortedBuildingBlocks
    ( InitializeUnsortedBuildingBlocks
    ) as Browser

import MoleculeBrowser.Initialize.UnsortedConstructedMolecules
    ( InitializeUnsortedConstructedMolecules
    ) as Browser

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
    :: Browser.InitializeUnsortedAll
    -> Payload

initializeUnsortedAllMoleculeBrowser
    = InitializeUnsortedAllMoleculeBrowser

initializeUnsortedBuildingBlocksMoleculeBrowser
    :: Browser.InitializeUnsortedBuildingBlocks
    -> Payload

initializeUnsortedBuildingBlocksMoleculeBrowser
    = InitializeUnsortedBuildingBlocksMoleculeBrowser

initializeUnsortedConstructedMoleculesMoleculeBrowser
    :: Browser.InitializeUnsortedConstructedMolecules
    -> Payload

initializeUnsortedConstructedMoleculesMoleculeBrowser
    = InitializeUnsortedConstructedMoleculesMoleculeBrowser

selectMolecule :: SelectMolecule -> Payload
selectMolecule = SelectMolecule

initializeMongoConfigurator :: InitializeMongoConfigurator -> Payload
initializeMongoConfigurator = InitializeMongoConfigurator

