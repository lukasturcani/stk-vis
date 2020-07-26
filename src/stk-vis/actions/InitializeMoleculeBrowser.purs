module StkVis.InitializeMoleculeBrowser
    ( InitializeMoleculeBrowser
    , initializeMoleculeBrowser
    ) where

import RequestManager.InitializeRequestManager
    ( InitializeRequestManager
    , initializeRequestManager
    )

import Molecules.InitializeMolecules
    ( InitializeMolecules
    , initializeMolecules
    )

data InitializeMoleculeBrowser = InitializeMoleculeBrowser
    { _initializeRequestManager :: InitializeRequestManager
    , _initializeMolecules      :: InitializeMolecules
    }

initializeMoleculeBrowser
    :: RequestManager -> Molecules -> InitializeMoleculeBrowser
initializeMoleculeBrowser requestManager molecules
    = InitializeMoleculeBrowser
    { _initializeRequestManager:
        initializeRequestManager requestManager
    , _initializeMolecules: initializeMolecules molecules
    }

initializeRequestManager
    :: InitializeMoleculeBrowser -> InitializeRequestManager
initializeRequestManager
    InitializeMoleculeBrowser
        { _initializeRequestManager
        }
    = _initializeRequestManager

initializeMolecules
    :: InitializeMoleculeBrowser -> InitializeMolecules
initializeMolecules
    InitializeMoleculeBrowser
        { _initializeMolecules
        }
    = _initializeMolecules
