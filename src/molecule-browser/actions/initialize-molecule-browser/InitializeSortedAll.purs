module MoleculeBrowser.InitializeMoleculeBrowser.SortedAll
    ( InitializeSortedAll
    , initializeSortedAll
    , initializeMolecules
    , initializeRequestManager
    ) where

import Molecules.InitializeMolecules
    ( InitializeMolecules
    )

import RequestManager.InitializeSortedAll as Base

data InitializeSortedAll = InitializeSortedAll
    { _initializeMolecules      :: InitializeMolecules
    , _initializeRequestManager :: Base.InitializeSortedAll
    }

initializeSortedAll
    :: InitializeMolecules
    -> Base.InitializeSortedAll
    -> InitializeSortedAll

initializeSortedAll molecules manager = InitializeSortedAll
    { _initializeMolecules: molecules
    , _initializeRequestManager: manager
    }

initializeMolecules :: InitializeSortedAll -> InitializeMolecules
initializeMolecules (InitializeSortedAll { _initializeMolecules })
    = _initializeMolecules

initializeRequestManager
    :: InitializeSortedAll -> Base.InitializeSortedAll

initializeRequestManager
    (InitializeSortedAll { _initializeRequestManager })
    = _initializeRequestManager
