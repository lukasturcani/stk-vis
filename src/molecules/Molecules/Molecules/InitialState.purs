module Molecules.Molecules.Internal.InitialState
    ( initialState
    ) where

import Molecules.Molecules.Internal.Molecules
    (  Molecules (..)
    )

import Molecules.Molecule (molecule)
import SelectingCollection (selectingCollection)
import Data.Map (empty)

initialState :: Molecules
initialState = Molecules
    { _columns: []
    , _molecules: selectingCollection [] (molecule empty) []
    }
