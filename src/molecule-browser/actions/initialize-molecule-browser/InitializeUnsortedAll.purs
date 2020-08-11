module MoleculeBrowser.Initialize.UnsortedAll
    ( InitializeUnsortedAll
    , initializeUnsortedAll
    , initializeMolecules
    , initializeRequestManager
    ) where

import Molecules.InitializeMolecules
    ( InitializeMolecules
    )

import RequestManager.InitializeUnsortedAll as Base

data InitializeUnsortedAll = InitializeUnsortedAll
    { _initializeMolecules      :: InitializeMolecules
    , _initializeRequestManager :: Base.InitializeUnsortedAll
    }

initializeUnsortedAll
    :: InitializeMolecules
    -> Base.InitializeUnsortedAll
    -> InitializeUnsortedAll

initializeUnsortedAll molecules manager
    = InitializeUnsortedAll
        { _initializeMolecules: molecules
        , _initializeRequestManager: manager
        }

initializeMolecules :: InitializeUnsortedAll -> InitializeMolecules
initializeMolecules (InitializeUnsortedAll { _initializeMolecules })
    = _initializeMolecules

initializeRequestManager
    :: InitializeUnsortedAll -> Base.InitializeUnsortedAll

initializeRequestManager
    (InitializeUnsortedAll { _initializeRequestManager })
    = _initializeRequestManager
