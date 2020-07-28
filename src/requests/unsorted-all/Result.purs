module Requests.UnsortedAll.Internal.Result
    ( Result (..)
    ) where

import Requests.PageKind (PageKind)
import Requests.Molecule (Molecule)

data Result = Result
    { valueCollections :: Array String
    , molecules        :: SelectingCollection Molecule
    , pageKind         :: PageKind
    }

