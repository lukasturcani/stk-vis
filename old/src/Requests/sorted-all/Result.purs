module Requests.SortedAll.Internal.Result
    ( Result (..)
    ) where

import Requests.PageKind (PageKind)
import Requests.Molecule (Molecule)
import SelectingCollection (SelectingCollection)
import Data.HashSet (HashSet)

data Result = Result
    { valueCollections :: HashSet String
    , molecules        :: SelectingCollection Molecule
    , pageKind         :: PageKind
    }
