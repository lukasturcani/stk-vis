module MongoConfigurator.Payload
    ( Payload (..)
    , updateFields
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

data Payload
    = UpdateFields UpdateFields
    | InitializeUnsortedAll InitializeUnsortedAll
    | InitializeUnsortedBuildingBlocks InitializeUnsortedBuildingBlocks
    | InitializeUnsortedConstructedMolecules
        InitializeUnsortedConstructedMolecules

updateFields :: UpdateFields -> Payload
updateFields = UpdateFields
