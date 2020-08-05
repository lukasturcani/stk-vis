module RequestManager.SetSorted
    ( SetSorted
    , CollectionName
    , setSorted
    , collection
    , sortType
    ) where

import RequestManager.SortType (SortType)

type CollectionName = String

data SetSorted = SetSorted
    { _collection :: CollectionName
    , _sortType   :: SortType
    }

setSorted :: CollectionName -> SortType -> SetSorted
setSorted name sortType' = SetSorted
    { _collection: name
    , _sortType: sortType'
    }

collection :: SetSorted -> CollectionName
collection (SetSorted { _collection }) = _collection

sortType :: SetSorted -> SortType
sortType (SetSorted { _sortType }) = _sortType
