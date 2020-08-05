module MoleculeBrowser.InitializeMoleculeBrowser.UnsortedBuildingBlocks
    ( InitializeUnsortedBuildingBlocks
    , initializeUnsortedBuildingBlocks
    , initializeMolecules
    , initializeRequestManager
    ) where

import Molecules.InitializeMolecules
    ( InitializeMolecules
    )

import RequestManager.InitializeUnsortedBuildingBlocks as Base

data InitializeUnsortedBuildingBlocks
    = InitializeUnsortedBuildingBlocks
        { _initializeMolecules :: InitializeMolecules
        , _initializeRequestManager
            :: Base.InitializeUnsortedBuildingBlocks
        }

initializeUnsortedBuildingBlocks
    :: InitializeMolecules
    -> Base.InitializeUnsortedBuildingBlocks
    -> InitializeUnsortedBuildingBlocks

initializeUnsortedBuildingBlocks molecules manager
    = InitializeUnsortedBuildingBlocks
        { _initializeMolecules: molecules
        , _initializeRequestManager: manager
        }

initializeMolecules
    :: InitializeUnsortedBuildingBlocks -> InitializeMolecules

initializeMolecules
    (InitializeUnsortedBuildingBlocks { _initializeMolecules })
    = _initializeMolecules

initializeRequestManager
    :: InitializeUnsortedBuildingBlocks
    -> Base.InitializeUnsortedBuildingBlocks

initializeRequestManager
    (InitializeUnsortedBuildingBlocks { _initializeRequestManager })
    = _initializeRequestManager
