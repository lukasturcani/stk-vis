module StkVis.Payload
    ( Payload (..)
    , updateMoleculePage
    , initializeUnsortedAll
    , initializeUnsortedBuildingBlocks
    , initializeUnsortedConstructedMolecules
    , setSorted
    , setUnsorted
    , selectMolecule
    , initializeMongoConfigurator
    ) where

import RequestManager.UpdateMoleculePage
    ( UpdateMoleculePage
    )

import MoleculeBrowser.Initialize.UnsortedAll
    ( InitializeUnsortedAll
    )

import MongoConfigurator.InitializeMoleculeBrowser.UnsortedBuildingBlocks
    ( InitializeUnsortedBuildingBlocks
    )

import MongoConfigurator.InitializeMoleculeBrowser.UnsortedConstructedMolecules
    ( InitializeUnsortedConstructedMolecules
    )

import RequestManager.SetSorted
    ( SetSorted
    )

import RequestManager.SetUnsorted
    ( SetUnsorted
    )

import Molecules.SelectMolecule
    ( SelectMolecule
    )

import MongoConfigurator.InitializeMongoConfigurator
    ( InitializeMongoConfigurator
    )

data Payload
    = UpdateMoleculePage UpdateMoleculePage
    | InitializeUnsortedAll InitializeUnsortedAll
    | InitializeUnsortedBuildingBlocks
        InitializeUnsortedBuildingBlocks
    | InitializeUnsortedConstructedMolecules
        InitializeUnsortedConstructedMolecules
    | SetSorted SetSorted
    | SetUnsorted SetUnsorted
    | SelectMolecule SelectMolecule
    | InitializeMongoConfigurator InitializeMongoConfigurator

updateMoleculePage :: UpdateMoleculePage -> Payload
updateMoleculePage = UpdateMoleculePage

initializeUnsortedAll :: InitializeUnsortedAll -> Payload
initializeUnsortedAll
    = InitializeUnsortedAll

initializeUnsortedBuildingBlocks
    :: InitializeUnsortedBuildingBlocks
    -> Payload

initializeUnsortedBuildingBlocks
    = InitializeUnsortedBuildingBlocks

initializeUnsortedConstructedMolecules
    :: InitializeUnsortedConstructedMolecules
    -> Payload

initializeUnsortedConstructedMolecules
    = InitializeUnsortedConstructedMolecules

setSorted :: SetSorted -> Payload
setSorted = SetSorted

setUnsorted :: SetUnsorted -> Payload
setUnsorted = SetUnsorted

selectMolecule :: SelectMolecule -> Payload
selectMolecule = SelectMolecule

initializeMongoConfigurator :: InitializeMongoConfigurator -> Payload
initializeMongoConfigurator = InitializeMongoConfigurator
