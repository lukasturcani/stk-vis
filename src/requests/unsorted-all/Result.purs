module Requests.UnsortedAll
    ( Result (..)
    , result
    ) where

import Requests.PageKind (PageKind)
import Requests.Molecule (Molecule)
import SelectingCollection (SelectingCollection)

data Result = Result
    { molecules        :: SelectingCollection Molecule
    , valueCollections :: Array String
    , pageKind         :: PageKind
    }

result :: SelectingCollection Molecule -> Array String -> PageKind
result molecules valueCollections pageKind = Result
    { molecules
    , valueCollections
    , pageKind
    }
