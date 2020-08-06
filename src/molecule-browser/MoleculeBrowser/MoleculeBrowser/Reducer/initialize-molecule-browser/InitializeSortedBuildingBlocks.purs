module MoleculeBrowser.MoleculeBrowser.Internal.Reducer.Internal.InitializeMoleculeBrowser.SortedBuildingBlocks
    ( initializeSortedBuildingBlocks
    ) where

import MoleculeBrowser.MoleculeBrowser.Internal.MoleculeBrowser
    ( MoleculeBrowser (MoleculeBrowser)
    )

import Molecules.Molecules as Molecules
import Molecules.Action as Molecules.Action
import RequestManager.RequestManager as Manager
import RequestManager.Action as Manager.Action
import MoleculeBrowser.InitializeSortedBuildingBlocks as Payload

initializeSortedBuildingBlocks
    :: MoleculeBrowser
    -> InitializeSortedBuildingBlocks
    -> MoleculeBrowser

initializeSortedBuildingBlocks
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
            (Manager.Action.initializeSortedBuildingBlocks
                (initializeRequestManager payload)
            )
        }
