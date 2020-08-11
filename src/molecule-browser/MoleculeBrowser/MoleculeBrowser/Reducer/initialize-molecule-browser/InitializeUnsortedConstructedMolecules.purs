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

import MoleculeBrowser.Initialize.UnsortedConstructedMolecules
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

    initializeMolecules = Molecules.Action.initializeMolecules
        (Browser.initializeMolecules payload)

    initializeRequestManager
        = Manager.Action.initializeUnsortedConstructedMolecules
            (Browser.initializeRequestManager payload)
