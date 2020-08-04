module RequestManager.Payload
    ( Payload (..)
    , initializeUnsortedAll
    , initializeUnsortedBuildingBlocks
    , initializeUnsortedConstructedMolecules
    , initializeSortedAll
    , initializeSortedBuildingBlocks
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

data Payload
    = InitializeUnsortedAll InitializeUnsortedAll
    | InitializeUnsortedBuildingBlocks InitializeUnsortedBuildingBlocks
    | InitializeUnsortedConstructedMolecules
        InitializeUnsortedConstructedMolecules
    | InitializeSortedAll InitializeSortedAll
    | InitializeSortedBuildingBlocks InitializeSortedBuildingBlocks

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
