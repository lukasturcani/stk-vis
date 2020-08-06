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
import MoleculeBrowser.InitializeUnsortedBuildingBlocks as Payload

initializeUnsortedBuildingBlocks
    :: MoleculeBrowser
    -> InitializeUnsortedBuildingBlocks
    -> MoleculeBrowser

initializeUnsortedBuildingBlocks
    (MoleculeBrowser { _molecules, _requestManager })
    payload
    = MoleculeBrowser
        { _molecules: Molecules.reducer
            _molecules
            (Molecules.Action.initializeMolecules
                (initializeMolecules payload)
            )

        , _requestManager: Manager.reducer
            _requestManager
            (Manager.Action.initializeUnsortedBuildingBlocks
                (initializeRequestManager payload)
            )
        }
