module MongoConfigurator.InitializeMoleculeBrowser.UnsortedConstructedMolecules
    ( InitializeUnsortedConstructedMolecules
    , initializeUnsortedConstructedMolecules
    , initializeMolecules
    , initializeRequestManager
    ) where

import Molecules.InitializeMolecules
    ( InitializeMolecules
    )

import RequestManager.InitializeUnsortedConstructedMolecules as Base

data InitializeUnsortedConstructedMolecules
    = InitializeUnsortedConstructedMolecules
        { _initializeMolecules :: InitializeMolecules
        , _initializeRequestManager
            :: Base.InitializeUnsortedConstructedMolecules
        }

initializeUnsortedConstructedMolecules
    :: InitializeMolecules
    -> Base.InitializeUnsortedConstructedMolecules
    -> InitializeUnsortedConstructedMolecules

initializeUnsortedConstructedMolecules molecules manager
    = InitializeUnsortedConstructedMolecules
        { _initializeMolecules: molecules
        , _initializeRequestManager: manager
        }

initializeMolecules
    :: InitializeUnsortedConstructedMolecules -> InitializeMolecules

initializeMolecules
    (InitializeUnsortedConstructedMolecules { _initializeMolecules })
    = _initializeMolecules

initializeRequestManager
    :: InitializeUnsortedConstructedMolecules
    -> Base.InitializeUnsortedConstructedMolecules

initializeRequestManager
    (InitializeUnsortedConstructedMolecules
        { _initializeRequestManager }
    )
    = _initializeRequestManager
