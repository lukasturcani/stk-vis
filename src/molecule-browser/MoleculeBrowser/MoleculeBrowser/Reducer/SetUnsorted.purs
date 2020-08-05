module MoleculeBrowser.MoleculeBrowser.Internal.Reducer.Internal.SetUnsorted
    ( setUnsorted
    ) where

import MoleculeBrowser.MoleculeBrowser.Internal.MoleculeBrowser
    ( MoleculeBrowser (MoleculeBrowser)
    )

import MoleculeBrowser.SetUnsorted
    ( SetUnsorted
    , toRequestManager
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
                (Action.setUnsorted (toRequestManager payload))
        , _molecules
        }
