module MongoConfigurator.InitializeMoleculeBrowser.UnsortedAll
    ( InitializeUnsortedAll
    , initializeUnsortedAll
    , initializeMolecules
    , initializeRequestManager
    ) where

import Molecules.InitializeMolecules as Molecules
import RequestManager.InitializeUnsortedAll as Manager

import MoleculeBrowser.InitializeMoleculeBrowser.UnsortedAll
    as Base

newtype InitializeUnsortedAll
    = InitializeUnsortedAll Base.InitializeUnsortedAll

initializeUnsortedAll
    :: Molecules.InitializeMolecules
    -> Manager.InitializeUnsortedAll
    -> InitializeUnsortedAll

initializeUnsortedAll molecules manager
    = InitializeUnsortedAll
        (Base.initializeUnsortedAll molecules manager)

initializeMolecules
    :: InitializeUnsortedAll
    -> Molecules.InitializeMolecules

initializeMolecules (InitializeUnsortedAll payload)
    = Base.initializeMolecules payload

initializeRequestManager
    :: InitializeUnsortedAll -> Manager.InitializeUnsortedAll

initializeRequestManager (InitializeUnsortedAll payload)
    = Base.initializeRequestManager payload
