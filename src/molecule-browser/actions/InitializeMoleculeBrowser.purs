module MoleculeBrowser.InitializeMoleculeBrowser
    ( InitializeMoleculeBrowser
    , initializeMoleculeBrowser
    , initializeMolecules
    , initializeRequestManager
    ) where

import RequestManager.RequestManager (RequestManager)
import Molecules.Molecules (Molecules)

import RequestManager.InitializeRequestManager
    ( InitializeRequestManager
    )

import RequestManager.InitializeRequestManager
    ( initializeRequestManager
    ) as RequestManager

import Molecules.InitializeMolecules
    ( InitializeMolecules
    )

import Molecules.InitializeMolecules
    ( initializeMolecules
    ) as Molecules

data InitializeMoleculeBrowser = InitializeMoleculeBrowser
    { _initializeRequestManager :: InitializeRequestManager
    , _initializeMolecules      :: InitializeMolecules
    }

initializeMoleculeBrowser
    :: RequestManager -> Molecules -> InitializeMoleculeBrowser
initializeMoleculeBrowser requestManager molecules
    = InitializeMoleculeBrowser
    { _initializeRequestManager:
        RequestManager.initializeRequestManager
    , _initializeMolecules: Molecules.initializeMolecules
    }

initializeRequestManager
    :: InitializeMoleculeBrowser -> InitializeRequestManager
initializeRequestManager
    (InitializeMoleculeBrowser
        { _initializeRequestManager
        }
    )
    = _initializeRequestManager

initializeMolecules
    :: InitializeMoleculeBrowser -> InitializeMolecules
initializeMolecules
    (InitializeMoleculeBrowser
        { _initializeMolecules
        }
    )
    = _initializeMolecules
