module MoleculeBrowser.SetSorted
    ( SetSorted
    , setSorted
    , toRequestManager
    ) where

import RequestManager.SetSorted as Base
import RequestManager.SortType (SortType)

newtype SetSorted = SetSorted Base.SetSorted

setSorted :: Base.CollectionName -> SortType -> SetSorted
setSorted name sortType = SetSorted (Base.setSorted name sortType)

toRequestManager :: SetSorted -> Base.SetSorted
toRequestManager (SetSorted payload) = payload
