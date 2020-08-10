module MoleculeBrowser.MoleculeBrowser.Internal.Reducer.Internal.SetSorted
    ( setSorted
    ) where

import MoleculeBrowser.MoleculeBrowser.Internal.MoleculeBrowser
    ( MoleculeBrowser (MoleculeBrowser)
    )

import RequestManager.SetSorted
    ( SetSorted
    )

import RequestManager.RequestManager as Manager
import RequestManager.Action as Action

setSorted :: MoleculeBrowser -> SetSorted -> MoleculeBrowser
setSorted
    (MoleculeBrowser { _requestManager, _molecules })
    payload
    = MoleculeBrowser
        { _requestManager:
            Manager.reducer
                _requestManager
                (Action.setSorted payload)
        , _molecules
        }
