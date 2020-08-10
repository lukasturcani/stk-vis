module MoleculeBrowser.SetSorted
    ( SetSorted
    , setSorted
    , toRequestManager
    ) where

import RequestManager.SetSorted as Base

newtype SetSorted = SetSorted Base.SetSorted

setSorted :: Base.SetSorted -> SetSorted
setSorted = SetSorted

toRequestManager :: SetSorted -> Base.SetSorted
toRequestManager (SetSorted payload) = payload
