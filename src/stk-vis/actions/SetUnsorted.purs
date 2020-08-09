module StkVis.SetUnsorted
    ( SetUnsorted
    , setUnsorted
    , toMoleculeBrowser
    ) where

import MoleculeBrowser.SetSorted as Base

newtype SetUnsorted = SetUnsorted Base.SetUnsorted

setUnsorted :: Base.SetUnsorted -> SetUnsorted
setUnsorted = SetUnsorted

toMoleculeBrowser :: SetUnsorted -> Base.SetUnsorted
toMoleculeBrowser (SetUnsorted payload) = payload
