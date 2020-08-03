module Molecules.Molecules.Internal.InitialState
    ( initialState
    , Columns
    ) where

import Molecules.Molecules.Internal.Molecules
    (  Molecules (..)
    )

import Molecules.Molecule (Molecule)
import SelectingCollection (SelectingCollection)
import Data.Map (empty)

type Columns = Array String

initialState ::  Columns -> SelectingCollection Molecule -> Molecules
initialState columns molecules = Molecules
    { _columns: columns
    , _molecules: molecules
    }
