module StkVis.SetSorted
    ( SetSorted
    , setSorted
    , toRequestManager
    ) where

import RequestManager.SetSorted as Manager

newtype SetSorted = SetSorted Manager.SetSorted

setSorted :: Manager.SetSorted -> SetSorted
setSorted = SetSorted

toRequestManager :: SetSorted -> Manager.SetSorted
toRequestManager (SetSorted payload) = payload
