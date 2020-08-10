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
    , initializeUnsortedBuildingBlocks
    ) as StkVis

import MongoConfigurator.InitializeMoleculeBrowser.UnsortedBuildingBlocks
    ( InitializeUnsortedBuildingBlocks
    ) as Configurator

import StkVis.InitializeMoleculeBrowser.UnsortedConstructedMolecules
    ( InitializeUnsortedConstructedMolecules
    , initializeUnsortedConstructedMolecules
    ) as StkVis

import MongoConfigurator.InitializeMoleculeBrowser.UnsortedConstructedMolecules
    ( InitializeUnsortedConstructedMolecules
    ) as Configurator

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

import MongoConfigurator.InitializeMongoConfigurator
    ( InitializeMongoConfigurator
    )

data Payload
    = UpdateMoleculePage StkVis.UpdateMoleculePage
    | InitializeUnsortedAll StkVis.InitializeUnsortedAll
    | InitializeUnsortedBuildingBlocks
        StkVis.InitializeUnsortedBuildingBlocks
    | InitializeUnsortedConstructedMolecules
        StkVis.InitializeUnsortedConstructedMolecules
    | SetSorted StkVis.SetSorted
    | SetUnsorted StkVis.SetUnsorted
    | SelectMolecule StkVis.SelectMolecule
    | InitializeMongoConfigurator InitializeMongoConfigurator

updateMoleculePage :: Manager.UpdateMoleculePage -> Payload
updateMoleculePage = UpdateMoleculePage <<< StkVis.updateMoleculePage

initializeUnsortedAll :: Configurator.InitializeUnsortedAll -> Payload
initializeUnsortedAll
    = InitializeUnsortedAll <<< StkVis.initializeUnsortedAll

initializeUnsortedBuildingBlocks
    :: Configurator.InitializeUnsortedBuildingBlocks
    -> Payload

initializeUnsortedBuildingBlocks
    = InitializeUnsortedBuildingBlocks <<<
        StkVis.initializeUnsortedBuildingBlocks

initializeUnsortedConstructedMolecules
    :: Configurator.InitializeUnsortedConstructedMolecules
    -> Payload

initializeUnsortedConstructedMolecules
    = InitializeUnsortedConstructedMolecules <<<
        StkVis.initializeUnsortedConstructedMolecules

setSorted :: Manager.SetSorted -> Payload
setSorted = SetSorted <<< StkVis.setSorted

setUnsorted :: Manager.SetUnsorted -> Payload
setUnsorted = SetUnsorted <<< StkVis.setUnsorted

selectMolecule :: Molecules.SelectMolecule -> Payload
selectMolecule = SelectMolecule <<< StkVis.selectMolecule

initializeMongoConfigurator :: InitializeMongoConfigurator -> Payload
initializeMongoConfigurator = InitializeMongoConfigurator
