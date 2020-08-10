module MongoConfigurator.Payload
    ( Payload (..)
    , updateFields
    , initializeUnsortedAll
    , initializeUnsortedBuildingBlocks
    , initializeUnsortedConstructedMolecules
    , initializeMongoConfigurator
    ) where

import MongoConfigurator.UpdateFields.UpdateFields (UpdateFields)

import MongoConfigurator.InitializeMoleculeBrowser.UnsortedAll
    ( InitializeUnsortedAll
    )

import MongoConfigurator.InitializeMoleculeBrowser.UnsortedBuildingBlocks
    ( InitializeUnsortedBuildingBlocks
    )

import MongoConfigurator.InitializeMoleculeBrowser.UnsortedConstructedMolecules
    ( InitializeUnsortedConstructedMolecules
    )

import MongoConfigurator.InitializeMongoConfigurator
    ( InitializeMongoConfigurator
    )

data Payload
    = UpdateFields UpdateFields
    | InitializeUnsortedAll InitializeUnsortedAll
    | InitializeUnsortedBuildingBlocks InitializeUnsortedBuildingBlocks
    | InitializeUnsortedConstructedMolecules
        InitializeUnsortedConstructedMolecules
    | InitializeMongoConfigurator InitializeMongoConfigurator

updateFields :: UpdateFields -> Payload
updateFields = UpdateFields

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

initializeMongoConfigurator :: InitializeMongoConfigurator -> Payload
initializeMongoConfigurator = InitializeMongoConfigurator
