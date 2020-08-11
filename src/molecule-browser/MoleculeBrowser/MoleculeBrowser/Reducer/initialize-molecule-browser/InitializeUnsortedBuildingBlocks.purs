module MoleculeBrowser.MoleculeBrowser.Internal.Reducer.Internal.InitializeMoleculeBrowser.UnsortedBuildingBlocks
    ( initializeUnsortedBuildingBlocks
    ) where

import MoleculeBrowser.MoleculeBrowser.Internal.MoleculeBrowser
    ( MoleculeBrowser (MoleculeBrowser)
    )

import Molecules.Molecules as Molecules
import Molecules.Action as Molecules.Action
import RequestManager.RequestManager as Manager
import RequestManager.Action as Manager.Action

import MoleculeBrowser.Initialize.UnsortedBuildingBlocks
    as Browser

initializeUnsortedBuildingBlocks
    :: MoleculeBrowser
    -> Browser.InitializeUnsortedBuildingBlocks
    -> MoleculeBrowser

initializeUnsortedBuildingBlocks
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
        = Manager.Action.initializeUnsortedBuildingBlocks
            (Browser.initializeRequestManager payload)
