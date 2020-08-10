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

import Prelude
import StkVis.UpdateMoleculePage
    ( UpdateMoleculePage
    , updateMoleculePage
    ) as StkVis

import RequestManager.UpdateMoleculePage
    ( UpdateMoleculePage
    ) as Manager

import StkVis.InitializeMoleculeBrowser.UnsortedAll
    ( InitializeUnsortedAll
    , initializeUnsortedAll
    ) as StkVis

import MongoConfigurator.InitializeMoleculeBrowser.UnsortedAll
    ( InitializeUnsortedAll
    ) as Configurator


import StkVis.InitializeMoleculeBrowser.UnsortedBuildingBlocks
    ( InitializeUnsortedBuildingBlocks
    )
import StkVis.InitializeMoleculeBrowser.UnsortedConstructedMolecules
    ( InitializeUnsortedConstructedMolecules
    )
import StkVis.SetSorted
    ( SetSorted
    , setSorted
    ) as StkVis

import RequestManager.SetSorted
    ( SetSorted
    ) as Manager

import StkVis.SetUnsorted
    ( SetUnsorted
    , setUnsorted
    ) as StkVis

import RequestManager.SetUnsorted
    ( SetUnsorted
    ) as Manager

import StkVis.SelectMolecule
    ( SelectMolecule
    , selectMolecule
    ) as StkVis

import Molecules.SelectMolecule
    ( SelectMolecule
    ) as Molecules

import StkVis.InitializeMongoConfigurator
    ( InitializeMongoConfigurator
    , initializeMongoConfigurator
    ) as StkVis

import RequestManager.InitializeMongoConfigurator
    ( InitializeMongoConfigurator
    ) as Manager

data Payload
    = UpdateMoleculePage StkVis.UpdateMoleculePage
    | InitializeUnsortedAll StkVis.InitializeUnsortedAll
    | InitializeUnsortedBuildingBlocks InitializeUnsortedBuildingBlocks
    | InitializeUnsortedConstructedMolecules
        InitializeUnsortedConstructedMolecules
    | SetSorted StkVis.SetSorted
    | SetUnsorted StkVis.SetUnsorted
    | SelectMolecule StkVis.SelectMolecule
    | InitializeMongoConfigurator StkVis.InitializeMongoConfigurator

updateMoleculePage :: Manager.UpdateMoleculePage -> Payload
updateMoleculePage = UpdateMoleculePage <<< StkVis.updateMoleculePage

initializeUnsortedAll :: Configurator.InitializeUnsortedAll -> Payload
initializeUnsortedAll
    = InitializeUnsortedAll <<< StkVis.initializeUnsortedAll

initializeUnsortedBuildingBlocks
    :: InitializeUnsortedBuildingBlocks
    -> Payload

initializeUnsortedBuildingBlocks = InitializeUnsortedBuildingBlocks

initializeUnsortedConstructedMolecules
    :: InitializeUnsortedConstructedMolecules
    -> Payload

initializeUnsortedConstructedMolecules
    = InitializeUnsortedConstructedMolecules

setSorted :: Manager.SetSorted -> Payload
setSorted = SetSorted <<< StkVis.setSorted

setUnsorted :: Manager.SetUnsorted -> Payload
setUnsorted = SetUnsorted <<< StkVis.setUnsorted

selectMolecule :: Molecules.SelectMolecule -> Payload
selectMolecule = SelectMolecule <<< StkVis.selectMolecule

initializeMongoConfigurator
    :: Manager.InitializeMongoConfigurator -> Payload

initializeMongoConfigurator
    = InitializeMongoConfigurator
    <<< StkVis.initializeMongoConfigurator
