module MoleculeBrowser.MoleculeBrowser.Internal.Reducer.Internal.InitializeMoleculeBrowser.UnsortedAll
    ( initializeUnsortedAll
    ) where

import MoleculeBrowser.MoleculeBrowser.Internal.MoleculeBrowser
    ( MoleculeBrowser (MoleculeBrowser)
    )

import Molecules.Molecules as Molecules
import Molecules.Action as Molecules.Action
import RequestManager.RequestManager as Manager
import RequestManager.Action as Manager.Action

import MoleculeBrowser.InitializeMoleculeBrowser.UnsortedAll
    as Browser

import MongoConfigurator.InitializeMoleculeBrowser.UnsortedAll
    as Configurator

initializeUnsortedAll
    :: MoleculeBrowser
    -> Browser.InitializeUnsortedAll
    -> MoleculeBrowser

initializeUnsortedAll
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

    initializeRequestManager = Manager.Action.initializeUnsortedAll
        (Configurator.initializeRequestManager payload')
