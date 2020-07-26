module MoleculeBrowser.InitializeMoleculeBrowser
    ( InitializeMoleculeBrowser
    , initializeMoleculeBrowser
    , initializeMolecules
    , initializeRequestManager
    ) where

import RequestManager.RequestManager (RequestManager)
import SelectingCollection (SelectingCollection)

import RequestManager.InitializeRequestManager
    ( InitializeRequestManager
    )

import RequestManager.InitializeRequestManager
    ( initializeRequestManager
    ) as RequestManager

import Molecules.InitializeMolecules
    ( InitializeMolecules
    , Molecule
    )

import Molecules.InitializeMolecules
    ( initializeMolecules
    ) as Molecules

data InitializeMoleculeBrowser = InitializeMoleculeBrowser
    { _initializeRequestManager :: InitializeRequestManager
    , _initializeMolecules      :: InitializeMolecules
    }

initializeMoleculeBrowser
    :: RequestManager
    -> SelectingCollection Molecule
    -> InitializeMoleculeBrowser
initializeMoleculeBrowser requestManager molecules
    = InitializeMoleculeBrowser
    { _initializeRequestManager:
        RequestManager.initializeRequestManager
    , _initializeMolecules: Molecules.initializeMolecules molecules
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
