module MongoConfigurator.InitializeMoleculeBrowser.SortedConstructedMolecules
    ( InitializeSortedConstructedMolecules
    , initializeSortedConstructedMolecules
    , initializeMolecules
    , initializeRequestManager
    ) where

import Molecules.InitializeMolecules as Molecules
import RequestManager.InitializeSortedConstructedMolecules as Manager

import MoleculeBrowser.InitializeMoleculeBrowser.SortedConstructedMolecules
    as Base

newtype InitializeSortedConstructedMolecules
    = InitializeSortedConstructedMolecules
        Base.InitializeSortedConstructedMolecules

initializeSortedConstructedMolecules
    :: Molecules.InitializeMolecules
    -> Manager.InitializeSortedConstructedMolecules
    -> InitializeSortedConstructedMolecules

initializeSortedConstructedMolecules molecules manager
    = InitializeSortedConstructedMolecules
        (Base.initializeSortedConstructedMolecules molecules manager)

initializeMolecules
    :: InitializeSortedConstructedMolecules
    -> Molecules.InitializeMolecules

initializeMolecules (InitializeSortedConstructedMolecules payload)
    = Base.initializeMolecules payload

initializeRequestManager
    :: InitializeSortedConstructedMolecules
    -> Manager.InitializeSortedConstructedMolecules

initializeRequestManager (InitializeSortedConstructedMolecules payload)
    = Base.initializeRequestManager payload
