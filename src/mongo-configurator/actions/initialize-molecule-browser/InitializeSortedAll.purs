module MongoConfigurator.InitializeMoleculeBrowser.SortedAll
    ( InitializeSortedAll
    , initializeSortedAll
    , initializeMolecules
    , initializeRequestManager
    ) where

import Molecules.InitializeMolecules as Molecules
import RequestManager.InitializeSortedAll as Manager

import MoleculeBrowser.InitializeMoleculeBrowser.SortedAll
    as Base

newtype InitializeSortedAll
    = InitializeSortedAll Base.InitializeSortedAll

initializeSortedAll
    :: Molecules.InitializeMolecules
    -> Manager.InitializeSortedAll
    -> InitializeSortedAll

initializeSortedAll molecules manager
    = InitializeSortedAll (Base.initializeSortedAll molecules manager)

initializeMolecules
    :: InitializeSortedAll
    -> Molecules.InitializeMolecules
initializeMolecules (InitializeSortedAll payload)
    = Base.initializeMolecules payload

initializeRequestManager
    :: InitializeSortedAll -> Manager.InitializeSortedAll

initializeRequestManager (InitializeSortedAll payload)
    = Base.initializeRequestManager payload
