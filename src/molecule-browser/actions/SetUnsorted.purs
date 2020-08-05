module MoleculeBrowser.SetUnsorted
    ( SetUnsorted
    , setUnsorted
    , toRequestManager
    ) where

import RequestManager.SetUnsorted as Base

newtype SetUnsorted = SetUnsorted Base.SetUnsorted

setUnsorted :: SetUnsorted
setUnsorted = SetUnsorted Base.setUnsorted

toRequestManager :: SetUnsorted -> Base.SetUnsorted
toRequestManager (SetUnsorted payload) = payload
