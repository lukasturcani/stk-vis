module MongoConfigurator.InitializeMoleculeBrowser.SortedBuildingBlocks
    ( InitializeSortedBuildingBlocks
    , initializeSortedBuildingBlocks
    , initializeMolecules
    , initializeRequestManager
    ) where

import Molecules.InitializeMolecules as Molecules
import RequestManager.InitializeSortedBuildingBlocks as Manager

import MoleculeBrowser.InitializeMoleculeBrowser.SortedBuildingBlocks
    as Base

newtype InitializeSortedBuildingBlocks
    = InitializeSortedBuildingBlocks
        Base.InitializeSortedBuildingBlocks

initializeSortedBuildingBlocks
    :: Molecules.InitializeMolecules
    -> Manager.InitializeSortedBuildingBlocks
    -> InitializeSortedBuildingBlocks

initializeSortedBuildingBlocks molecules manager
    = InitializeSortedBuildingBlocks
        (Base.initializeSortedBuildingBlocks molecules manager)

initializeMolecules
    :: InitializeSortedBuildingBlocks -> Molecules.InitializeMolecules

initializeMolecules (InitializeSortedBuildingBlocks payload)
    = Base.initializeMolecules payload

initializeRequestManager
    :: InitializeSortedBuildingBlocks
    -> Manager.InitializeSortedBuildingBlocks

initializeRequestManager (InitializeSortedBuildingBlocks payload)
    = Base.initializeRequestManager payload
