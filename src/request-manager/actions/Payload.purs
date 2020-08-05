module RequestManager.Payload
    ( Payload (..)
    , initializeUnsortedAll
    , initializeUnsortedBuildingBlocks
    , initializeUnsortedConstructedMolecules
    , initializeSortedAll
    , initializeSortedBuildingBlocks
    , initializeSortedConstructedMolecules
    , setUnsorted
    , setSorted
    ) where

import RequestManager.InitializeUnsortedAll
    ( InitializeUnsortedAll
    )

import RequestManager.InitializeUnsortedBuildingBlocks
    ( InitializeUnsortedBuildingBlocks
    )

import RequestManager.InitializeUnsortedConstructedMolecules
    ( InitializeUnsortedConstructedMolecules
    )

import RequestManager.InitializeSortedAll
    ( InitializeSortedAll
    )

import RequestManager.InitializeSortedBuildingBlocks
    ( InitializeSortedBuildingBlocks
    )

import RequestManager.InitializeSortedConstructedMolecules
    ( InitializeSortedConstructedMolecules
    )

import RequestManager.SetUnsorted (SetUnsorted)
import RequestManager.SetSorted (SetSorted)

data Payload
    = InitializeUnsortedAll InitializeUnsortedAll
    | InitializeUnsortedBuildingBlocks InitializeUnsortedBuildingBlocks
    | InitializeUnsortedConstructedMolecules
        InitializeUnsortedConstructedMolecules
    | InitializeSortedAll InitializeSortedAll
    | InitializeSortedBuildingBlocks InitializeSortedBuildingBlocks
    | InitializeSortedConstructedMolecules
        InitializeSortedConstructedMolecules
    | SetUnsorted SetUnsorted
    | SetSorted SetSorted

initializeUnsortedAll :: InitializeUnsortedAll -> Payload
initializeUnsortedAll = InitializeUnsortedAll

initializeUnsortedBuildingBlocks
    :: InitializeUnsortedBuildingBlocks -> Payload

initializeUnsortedBuildingBlocks = InitializeUnsortedBuildingBlocks

initializeUnsortedConstructedMolecules
    :: InitializeUnsortedConstructedMolecules -> Payload

initializeUnsortedConstructedMolecules
    = InitializeUnsortedConstructedMolecules

initializeSortedAll :: InitializeSortedAll -> Payload
initializeSortedAll = InitializeSortedAll

initializeSortedBuildingBlocks
    :: InitializeSortedBuildingBlocks -> Payload

initializeSortedBuildingBlocks = InitializeSortedBuildingBlocks

initializeSortedConstructedMolecules
    :: InitializeSortedConstructedMolecules -> Payload

initializeSortedConstructedMolecules
    = InitializeSortedConstructedMolecules

setUnsorted :: SetUnsorted -> Payload
setUnsorted = SetUnsorted

setSorted :: SetSorted -> Payload
setSorted = SetSorted
