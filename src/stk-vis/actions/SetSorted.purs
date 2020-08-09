module StkVis.SetSorted
    ( SetSorted
    , setSorted
    , toMoleculeBrowser
    ) where

import MoleculeBrowser.SetSorted as Base

newtype SetSorted = SetSorted Base.SetSorted

setSorted :: Base.SetSorted -> SetSorted
setSorted = SetSorted

toMoleculeBrowser :: SetSorted -> Base.SetSorted
toMoleculeBrowser (SetSorted payload) = payload
