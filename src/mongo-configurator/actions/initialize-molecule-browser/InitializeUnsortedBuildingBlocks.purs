module MongoConfigurator.InitializeMoleculeBrowser.UnsortedBuildingBlocks
    ( InitializeUnsortedBuildingBlocks
    , initializeUnsortedBuildingBlocks
    , initializeMolecules
    , initializeRequestManager
    , toMoleculeBrowser
    ) where

import Molecules.InitializeMolecules as Molecules
import RequestManager.InitializeUnsortedBuildingBlocks as Manager

import MoleculeBrowser.InitializeMoleculeBrowser.UnsortedBuildingBlocks
    as Base

newtype InitializeUnsortedBuildingBlocks
    = InitializeUnsortedBuildingBlocks
        Base.InitializeUnsortedBuildingBlocks

initializeUnsortedBuildingBlocks
    :: Molecules.InitializeMolecules
    -> Manager.InitializeUnsortedBuildingBlocks
    -> InitializeUnsortedBuildingBlocks

initializeUnsortedBuildingBlocks molecules manager
    = InitializeUnsortedBuildingBlocks
        (Base.initializeUnsortedBuildingBlocks molecules manager)

initializeMolecules
    :: InitializeUnsortedBuildingBlocks
    -> Molecules.InitializeMolecules

initializeMolecules (InitializeUnsortedBuildingBlocks payload)
    = Base.initializeMolecules payload

initializeRequestManager
    :: InitializeUnsortedBuildingBlocks
    -> Manager.InitializeUnsortedBuildingBlocks

initializeRequestManager (InitializeUnsortedBuildingBlocks payload)
    = Base.initializeRequestManager payload

toMoleculeBrowser
    :: InitializeUnsortedBuildingBlocks
    -> Base.InitializeUnsortedBuildingBlocks

toMoleculeBrowser (InitializeUnsortedBuildingBlocks payload) = payload
