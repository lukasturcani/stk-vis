module StkVis.InitializeMoleculeBrowser.UnsortedBuildingBlocks
    ( InitializeUnsortedBuildingBlocks
    , initializeUnsortedBuildingBlocks
    , toMoleculeBrowser
    ) where

import MongoConfigurator.InitializeMoleculeBrowser.UnsortedBuildingBlocks
    as Base

import MoleculeBrowser.InitializeMoleculeBrowser.UnsortedBuildingBlocks
    as MoleculeBrowser

newtype InitializeUnsortedBuildingBlocks
    = InitializeUnsortedBuildingBlocks
        Base.InitializeUnsortedBuildingBlocks

initializeUnsortedBuildingBlocks
    :: Base.InitializeUnsortedBuildingBlocks
    -> InitializeUnsortedBuildingBlocks

initializeUnsortedBuildingBlocks = InitializeUnsortedBuildingBlocks

toMoleculeBrowser
    :: InitializeUnsortedBuildingBlocks
    -> MoleculeBrowser.InitializeUnsortedBuildingBlocks

toMoleculeBrowser (InitializeUnsortedBuildingBlocks payload)
    = Base.toMoleculeBrowser payload
