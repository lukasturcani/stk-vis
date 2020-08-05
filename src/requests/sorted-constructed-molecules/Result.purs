module Requests.SortedConstructedMolecules.Internal.Result
    ( Result (..)
    ) where

import Requests.PageKind (PageKind)
import Requests.Molecule (Molecule)
import SelectingCollection (SelectingCollection)

data Result = Result
    { valueCollections :: Array String
    , molecules        :: SelectingCollection Molecule
    , pageKind         :: PageKind
    }
