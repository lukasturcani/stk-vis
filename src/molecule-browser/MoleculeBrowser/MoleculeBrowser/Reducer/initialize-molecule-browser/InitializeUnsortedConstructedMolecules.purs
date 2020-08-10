module MoleculeBrowser.MoleculeBrowser.Internal.Reducer.Internal.InitializeMoleculeBrowser.UnsortedConstructedMolecules
    ( initializeUnsortedConstructedMolecules
    ) where

import MoleculeBrowser.MoleculeBrowser.Internal.MoleculeBrowser
    ( MoleculeBrowser (MoleculeBrowser)
    )

import Molecules.Molecules as Molecules
import Molecules.Action as Molecules.Action
import RequestManager.RequestManager as Manager
import RequestManager.Action as Manager.Action

import MongoConfigurator.InitializeMoleculeBrowser.UnsortedConstructedMolecules
    as Configurator

import MoleculeBrowser.InitializeMoleculeBrowser.UnsortedConstructedMolecules
    as Browser

initializeUnsortedConstructedMolecules
    :: MoleculeBrowser
    -> Browser.InitializeUnsortedConstructedMolecules
    -> MoleculeBrowser

initializeUnsortedConstructedMolecules
    (MoleculeBrowser { _molecules, _requestManager })
    payload
    = MoleculeBrowser
        { _molecules: Molecules.reducer _molecules initializeMolecules
        , _requestManager: Manager.reducer
            _requestManager
            initializeRequestManager
        }

  where

    payload' = Browser.toMongoConfigurator payload

    initializeMolecules = Molecules.Action.initializeMolecules
        (Configurator.initializeMolecules payload')

    initializeRequestManager
        = Manager.Action.initializeUnsortedConstructedMolecules
            (Configurator.initializeRequestManager payload')
