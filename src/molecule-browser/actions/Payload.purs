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

import MoleculeBrowser.InitializeMoleculeBrowser.UnsortedAll
    ( InitializeUnsortedAll
    ) as MoleculeBrowser

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

data Payload
    = UpdateMoleculePage UpdateMoleculePage
    | InitializeMolecules InitializeMolecules
    | SetSorted SetSorted
    | SetUnsorted SetUnsorted
    | InitializeUnsortedAllMoleculeBrowser
        MoleculeBrowser.InitializeUnsortedAll
    | InitializeUnsortedBuildingBlocksMoleculeBrowser
        MoleculeBrowser.InitializeUnsortedBuildingBlocks
    | InitializeUnsortedConstructedMoleculesMoleculeBrowser
        MoleculeBrowser.InitializeUnsortedConstructedMolecules
    | InitializeSortedAllMoleculeBrowser
        MoleculeBrowser.InitializeSortedAll
    | InitializeSortedBuildingBlocksMoleculeBrowser
        MoleculeBrowser.InitializeSortedBuildingBlocks
    | InitializeSortedConstructedMoleculesMoleculeBrowser
        MoleculeBrowser.InitializeSortedConstructedMolecules

updateMoleculePage :: UpdateMoleculePage -> Payload
updateMoleculePage = UpdateMoleculePage

initializeMolecules :: InitializeMolecules -> Payload
initializeMolecules = InitializeMolecules

setSorted :: SetSorted -> Payload
setSorted = SetSorted

setUnsorted :: SetUnsorted -> Payload
setUnsorted = SetUnsorted

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

initializeUnsortedAll
    :: MoleculeBrowser.InitializeUnsortedAll
    -> Payload

initializeUnsortedAllMoleculeBrowser
    = InitializeUnsortedAllMoleculeBrowser

initializeUnsortedBuildingBlocksMoleculeBrowser
    :: InitializeUnsortedBuildingBlocksMoleculeBrowser
    -> Payload

initializeSortedBuildingBlocksMoleculeBrowser

initializeUnsortedConstructedMoleculesMoleculeBrowser
    :: InitializeUnsortedConstructedMoleculesMoleculeBrowser
    -> Payload

initializeUnsortedConstructedMoleculesMoleculeBrowser
    = InitializeUnsortedConstructedMoleculesMoleculeBrowser
