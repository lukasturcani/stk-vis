module StkVis.InitializeMoleculeBrowser.UnsortedBuildingBlocks
    ( InitializeUnsortedBuildingBlocks
    , initializeUnsortedBuildingBlocks
    , toMongoConfigurator
    ) where

import MongoConfigurator.InitializeMoleculeBrowser.UnsortedBuildingBlocks
    as Configurator

newtype InitializeUnsortedBuildingBlocks
    = InitializeUnsortedBuildingBlocks
        Configurator.InitializeUnsortedBuildingBlocks

initializeUnsortedBuildingBlocks
    :: Configurator.InitializeUnsortedBuildingBlocks
    -> InitializeUnsortedBuildingBlocks

initializeUnsortedBuildingBlocks = InitializeUnsortedBuildingBlocks

toMongoConfigurator
    :: InitializeUnsortedBuildingBlocks
    -> Configurator.InitializeUnsortedBuildingBlocks

toMongoConfigurator (InitializeUnsortedBuildingBlocks payload)
    = payload
