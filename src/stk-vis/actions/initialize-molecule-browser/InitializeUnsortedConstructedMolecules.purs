module MongoConfigurator.InitializeMoleculeBrowser.UnsortedConstructedMolecules
    ( InitializeUnsortedConstructedMolecules
    , initializeUnsortedConstructedMolecules
    , initializeMolecules
    , initializeRequestManager
    ) where

import Molecules.InitializeMolecules as Molecules
import RequestManager.InitializeUnsortedConstructedMolecules as Manager

import MoleculeBrowser.InitializeMoleculeBrowser.UnsortedConstructedMolecules
    as Base

newtype InitializeUnsortedConstructedMolecules
    = InitializeUnsortedConstructedMolecules
        Base.InitializeUnsortedConstructedMolecules

initializeUnsortedConstructedMolecules
    :: Molecules.InitializeMolecules
    -> Manager.InitializeUnsortedConstructedMolecules
    -> InitializeUnsortedConstructedMolecules

initializeUnsortedConstructedMolecules molecules manager
    = InitializeUnsortedConstructedMolecules
        (Base.initializeUnsortedConstructedMolecules molecules manager)

initializeMolecules
    :: InitializeUnsortedConstructedMolecules
    -> Molecules.InitializeMolecules

initializeMolecules (InitializeUnsortedConstructedMolecules payload)
    = Base.initializeMolecules payload

initializeRequestManager
    :: InitializeUnsortedConstructedMolecules
    -> Manager.InitializeUnsortedConstructedMolecules

initializeRequestManager
    (InitializeUnsortedConstructedMolecules payload)
    = Base.initializeRequestManager payload
