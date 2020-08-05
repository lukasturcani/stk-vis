module MoleculeBrowser.Payload
    ( Payload (..)
    , updateMoleculePage
    , initializeMolecules
    , setSorted
    , setUnsorted
    , initializeSortedAll
    , initializeSortedBuildingBlocks
    , initializeSortedConstructedMolecules
    , initializeUnsortedAll
    , initializeUnsortedBuildingBlocks
    , initializeUnsortedConstructedMolecules
    ) where

import MoleculeBrowser.UpdateMoleculePage.UpdateMoleculePage
    ( UpdateMoleculePage
    )

import MoleculeBrowser.InitializeMolecules
    ( InitializeMolecules
    )

import MoleculeBrowser.SetSorted
    ( SetSorted
    )

import MoleculeBrowser.SetUnsorted
    ( SetUnsorted
    )

data Payload
    = UpdateMoleculePage UpdateMoleculePage
    | InitializeMolecules InitializeMolecules
    | SetSorted SetSorted
    | SetUnsorted SetUnsorted
    | InitializeUnsortedAll InitializeUnsortedAll
    | InitializeUnsortedBuildingBlocks InitializeUnsortedBuildingBlocks
    | InitializeUnsortedConstructedMolecules
        InitializeUnsortedConstructedMolecules
    | InitializeSortedAll InitializeSortedAll
    | InitializeSortedBuildingBlocks InitializeSortedBuildingBlocks
    | InitializeSortedConstructedMolecules
        InitializeSortedConstructedMolecules

updateMoleculePage :: UpdateMoleculePage -> Payload
updateMoleculePage = UpdateMoleculePage

initializeMolecules :: InitializeMolecules -> Payload
initializeMolecules = InitializeMolecules

setSorted :: SetSorted -> Payload
setSorted = SetSorted

setUnsorted :: SetUnsorted -> Payload
setUnsorted = SetUnsorted

initializeSortedAll :: InitializeSortedAll -> Payload
initializeSortedAll = InitializeSortedAll

initializeSortedBuildingBlocks
    :: InitializeSortedBuildingBlocks -> Payload
initializeSortedBuildingBlocks = InitializeSortedBuildingBlocks

initializeSortedConstructedMolecules
    :: InitializeSortedConstructedMolecules -> Payload
initializeSortedConstructedMolecules
    = InitializeSortedConstructedMolecules

initializeUnsortedAll :: InitializeUnsortedAll -> Payload
initializeUnsortedAll = InitializeUnsortedAll

initializeUnsortedBuildingBlocks
    :: InitializeUnsortedBuildingBlocks -> Payload
initializeSortedBuildingBlocks

initializeUnsortedConstructedMolecules
    :: InitializeUnsortedConstructedMolecules -> Payload
initializeUnsortedConstructedMolecules
    = InitializeUnsortedConstructedMolecules
