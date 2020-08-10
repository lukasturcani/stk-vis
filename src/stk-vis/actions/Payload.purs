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
    )
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
    )
import StkVis.InitializeMongoConfigurator
    ( InitializeMongoConfigurator
    , initializeMongoConfigurator
    ) as StkVis

import RequestManager.InitializeMongoConfigurator
    ( InitializeMongoConfigurator
    ) as Manager




data Payload
    = UpdateMoleculePage StkVis.UpdateMoleculePage
    | InitializeUnsortedAll InitializeUnsortedAll
    | InitializeUnsortedBuildingBlocks InitializeUnsortedBuildingBlocks
    | InitializeUnsortedConstructedMolecules
        InitializeUnsortedConstructedMolecules
    | SetSorted StkVis.SetSorted
    | SetUnsorted StkVis.SetUnsorted
    | SelectMolecule SelectMolecule
    | InitializeMongoConfigurator StkVis.InitializeMongoConfigurator

updateMoleculePage :: Manager.UpdateMoleculePage -> Payload
updateMoleculePage = UpdateMoleculePage <<< StkVis.updateMoleculePage

initializeUnsortedAll :: InitializeUnsortedAll -> Payload
initializeUnsortedAll = InitializeUnsortedAll

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

selectMolecule :: SelectMolecule -> Payload
selectMolecule = SelectMolecule

initializeMongoConfigurator
    :: Manager.InitializeMongoConfigurator -> Payload

initializeMongoConfigurator
    = InitializeMongoConfigurator
    <<< StkVis.initializeMongoConfigurator
