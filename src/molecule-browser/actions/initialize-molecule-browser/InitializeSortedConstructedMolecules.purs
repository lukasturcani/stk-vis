module MoleculeBrowser.InitializeMoleculeBrowser.SortedConstructedMolecules
    ( InitializeSortedConstructedMolecules
    , initializeSortedConstructedMolecules
    , initializeMolecules
    , initializeRequestManager
    ) where

import Molecules.InitializeMolecules
    ( InitializeMolecules
    )

import RequestManager.InitializeSortedConstructedMolecules as Base

data InitializeSortedConstructedMolecules
    = InitializeSortedConstructedMolecules
        { _initializeMolecules :: InitializeMolecules
        , _initializeRequestManager
            :: Base.InitializeSortedConstructedMolecules
        }

initializeSortedConstructedMolecules
    :: InitializeMolecules
    -> Base.InitializeSortedConstructedMolecules
    -> InitializeSortedConstructedMolecules

initializeSortedConstructedMolecules molecules manager
    = InitializeSortedConstructedMolecules
        { _initializeMolecules: molecules
        , _initializeRequestManager: manager
        }

initializeMolecules
    :: InitializeSortedConstructedMolecules -> InitializeMolecules

initializeMolecules
    (InitializeSortedConstructedMolecules { _initializeMolecules })
    = _initializeMolecules

initializeRequestManager
    :: InitializeSortedConstructedMolecules
    -> Base.InitializeSortedConstructedMolecules

initializeRequestManager
    (InitializeSortedConstructedMolecules
        { _initializeRequestManager }
    )
    = _initializeRequestManager
