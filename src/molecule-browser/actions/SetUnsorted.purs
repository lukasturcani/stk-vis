module MoleculeBrowser.SetUnsorted
    ( SetUnsorted
    , setUnsorted
    , toRequestManager
    ) where

import RequestManager.SetUnsorted as Base

newtype SetUnsorted = SetUnsorted Base.SetUnsorted

setUnsorted :: Base.SetUnsorted -> SetUnsorted
setUnsorted = SetUnsorted

toRequestManager :: SetUnsorted -> Base.SetUnsorted
toRequestManager (SetUnsorted payload) = payload
