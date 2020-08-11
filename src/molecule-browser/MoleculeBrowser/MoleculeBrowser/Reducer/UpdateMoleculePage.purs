module MoleculeBrowser.MoleculeBrowser.Internal.Reducer.Internal.UpdateMoleculePage
    ( updateMoleculePage
    ) where

import MoleculeBrowser.MoleculeBrowser.Internal.MoleculeBrowser
    ( MoleculeBrowser (..)
    )

import RequestManager.UpdateMoleculePage
    ( UpdateMoleculePage
    )

import RequestManager.RequestManager as Manager
import RequestManager.Action as Manager.Action
import Molecules.Molecules as Molecules
import Molecules.Action as Molecules.Action

updateMoleculePage
    :: MoleculeBrowser -> UpdateMoleculePage -> MoleculeBrowser

updateMoleculePage
    (MoleculeBrowser
        { _requestManager
        , _molecules
        }
    )
    payload
    = MoleculeBrowser
        { _requestManager: Manager.reducer
            _requestManager
            (Manager.Action.updateMoleculePage payload)

        , _molecules: Molecules.reducer
            _molecules
            (Molecules.Action.updateMoleculePage payload)
        }
