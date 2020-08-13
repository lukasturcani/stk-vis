module Requests.BuildingBlocks.Internal.Result
    ( Result (..)
    ) where

import Requests.Molecule (Molecule)
import SelectingCollection (SelectingCollection)

data Result = Result
    { molecules        :: SelectingCollection Molecule
    }
