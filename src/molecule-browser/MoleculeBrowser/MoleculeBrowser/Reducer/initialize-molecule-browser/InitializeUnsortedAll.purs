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
import MoleculeBrowser.InitializeUnsortedAll as Payload

initializeUnsortedAll
    :: MoleculeBrowser
    -> InitializeUnsortedAll
    -> MoleculeBrowser

initializeUnsortedAll
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
            (Manager.Action.initializeUnsortedAll
                (initializeRequestManager payload)
            )
        }
