module MoleculeBrowser.MoleculeBrowser.Internal.Reducer.Internal.SetUnsorted
    ( setUnsorted
    ) where

import MoleculeBrowser.MoleculeBrowser.Internal.MoleculeBrowser
    ( MoleculeBrowser (MoleculeBrowser)
    )

import RequestManager.SetUnsorted
    ( SetUnsorted
    )

import RequestManager.RequestManager as Manager
import RequestManager.Action as Action

setUnsorted :: MoleculeBrowser -> SetUnsorted -> MoleculeBrowser
setUnsorted
    (MoleculeBrowser { _requestManager, _molecules })
    payload
    = MoleculeBrowser
        { _requestManager:
            Manager.reducer
                _requestManager
                (Action.setUnsorted payload)
        , _molecules
        }
