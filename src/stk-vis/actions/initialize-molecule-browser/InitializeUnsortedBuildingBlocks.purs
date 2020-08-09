module StkVis.InitializeMoleculeBrowser.UnsortedBuildingBlocks
    ( InitializeUnsortedBuildingBlocks
    , initializeUnsortedBuildingBlocks
    , toMongoConfigurator
    ) where

import MoleculeBrowser.InitializeMoleculeBrowser.UnsortedBuildingBlocks
    as Base

newtype InitializeUnsortedBuildingBlocks
    = InitializeUnsortedBuildingBlocks
        Base.InitializeUnsortedBuildingBlocks

initializeUnsortedBuildingBlocks
    :: Base.InitializeUnsortedBuildingBlocks
    -> InitializeUnsortedBuildingBlocks

initializeUnsortedBuildingBlocks = InitializeUnsortedBuildingBlocks

toMongoConfigurator
    :: InitializeUnsortedBuildingBlocks
    -> Base.InitializeUnsortedBuildingBlocks

toMongoConfigurator (InitializeUnsortedBuildingBlocks payload)
    = payload
