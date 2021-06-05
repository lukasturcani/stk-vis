module Requests.UnsortedAll.Internal.Result
    ( Result (..)
    ) where

import Data.HashSet (HashSet)
import Requests.PageKind (PageKind)
import Requests.Molecule (Molecule)
import SelectingCollection (SelectingCollection)

data Result = Result
    { valueCollections :: HashSet String
    , molecules        :: SelectingCollection Molecule
    , pageKind         :: PageKind
    }
