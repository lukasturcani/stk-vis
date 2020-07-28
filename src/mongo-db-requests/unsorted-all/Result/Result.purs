module Requests.UnsortedAll
    ( Result (..)
    ) where

import Requests.Molecule (Molecule)
import Requests.PageKind (PageKind)

data Result = Result
    { molecules        :: Array Molecule
    , pageKind         :: PageKind
    , valueCollections :: Array String
    }

