module MoleculeBrowser.MoleculeBrowser.Internal.Reducer.Internal.InitializeMoleculeBrowser.SortedConstructedMolecules
    ( initializeSortedConstructedMolecules
    ) where

import MoleculeBrowser.MoleculeBrowser.Internal.MoleculeBrowser
    ( MoleculeBrowser (MoleculeBrowser)
    )

import Molecules.Molecules as Molecules
import Molecules.Action as Molecules.Action
import RequestManager.RequestManager as Manager
import RequestManager.Action as Manager.Action
import MoleculeBrowser.InitializeMoleculeBrowser.SortedConstructedMolecules
    as Payload

initializeSortedConstructedMolecules
    :: MoleculeBrowser
    -> Payload.InitializeSortedConstructedMolecules
    -> MoleculeBrowser

initializeSortedConstructedMolecules
    (MoleculeBrowser { _molecules, _requestManager })
    payload
    = MoleculeBrowser
        { _molecules: Molecules.reducer
            _molecules
            (Molecules.Action.initializeMolecules
                (Payload.initializeMolecules payload)
            )

        , _requestManager: Manager.reducer
            _requestManager
            (Manager.Action.initializeSortedConstructedMolecules
                (Payload.initializeRequestManager payload)
            )
        }
