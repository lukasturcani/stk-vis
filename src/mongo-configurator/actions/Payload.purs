module MongoConfigurator.Payload
    ( Payload (..)
    , updateFields
    , initializeSortedAll
    , initializeSortedBuildingBlocks
    , initializeSortedConstructedMolecules
    , initializeUnsortedAll
    , initializeUnsortedBuildingBlocks
    , initializeUnsortedConstructedMolecules
    ) where

import MongoConfigurator.UpdateFields.UpdateFields (UpdateFields)

data Payload
    = UpdateFields UpdateFields
    | InitializeSortedAll InitializeUnsortedAll
    | InitializeSortedBuildingBlocks InitializeSortedBuildingBlocks
    | InitializeSortedConstructedMolecules
        InitializeSortedConstructedMolecules
    | InitializeUnsortedAll InitializeUnsortedAll
    | InitializeUnsortedBuildingBlocks InitializeUnsortedBuildingBlocks
    | InitializeUnsortedConstructedMolecules
        InitializeUnsortedConstructedMolecules

updateFields :: UpdateFields -> Payload
updateFields = UpdateFields

initializeSortedAll :: InitializeSortedAll -> Payload
initializeSortedAll = InitializeSortedAll

initializeSortedBuildingBlocks
    :: InitializeSortedBuildingBlocks
    -> Payload

initializeSortedBuildingBlocks = InitializeSortedBuildingBlocks

initializeSortedConstructedMolecules
    :: InitializeSortedConstructedMolecules
    -> Payload

initializeSortedConstructedMolecules
    = InitializeSortedConstructedMolecules

initializeUnsortedAll :: InitializeUnsortedAll -> Payload
initializeUnsortedAll = InitializeUnsortedAll

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

