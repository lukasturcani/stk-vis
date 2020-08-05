module MoleculeBrowser.InitializeMoleculeBrowser.SortedBuildingBlocks
    ( InitializeSortedBuildingBlocks
    , initializeSortedBuildingBlocks
    , initializeMolecules
    , initializeRequestManager
    ) where

import Molecules.InitializeMolecules
    ( InitializeMolecules
    )

import RequestManager.InitializeSortedBuildingBlocks as Base

data InitializeSortedBuildingBlocks = InitializeSortedBuildingBlocks
    { _initializeMolecules      :: InitializeMolecules
    , _initializeRequestManager :: Base.InitializeSortedBuildingBlocks
    }

initializeSortedBuildingBlocks
    :: InitializeMolecules
    -> Base.InitializeSortedBuildingBlocks
    -> InitializeSortedBuildingBlocks

initializeSortedBuildingBlocks molecules manager
    = InitializeSortedBuildingBlocks
        { _initializeMolecules: molecules
        , _initializeRequestManager: manager
        }

initializeMolecules
    :: InitializeSortedBuildingBlocks -> InitializeMolecules

initializeMolecules
    (InitializeSortedBuildingBlocks { _initializeMolecules })
    = _initializeMolecules

initializeRequestManager
    :: InitializeSortedBuildingBlocks
    -> Base.InitializeSortedBuildingBlocks

initializeRequestManager
    (InitializeSortedBuildingBlocks { _initializeRequestManager })
    = _initializeRequestManager
