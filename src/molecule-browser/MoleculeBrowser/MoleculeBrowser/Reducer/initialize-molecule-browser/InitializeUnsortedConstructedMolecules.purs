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

import MoleculeBrowser.InitializeMoleculeBrowser.UnsortedConstructedMolecules
    as Payload

initializeUnsortedConstructedMolecules
    :: MoleculeBrowser
    -> Payload.InitializeUnsortedConstructedMolecules
    -> MoleculeBrowser

initializeUnsortedConstructedMolecules
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
            (Manager.Action.initializeUnsortedConstructedMolecules
                (Payload.initializeRequestManager payload)
            )
        }
