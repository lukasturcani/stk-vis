module Requests.PositionMatrix.Internal.ToPositionMatrixEntry
    ( toPositionMatrixEntry
    ) where

import Prelude
import Data.Maybe (Maybe (Nothing, Just))
import Requests.MoleculeKey (MoleculeKeyName)
import ValidatedMolecule.Position (Position, position)

import Requests.PositionMatrix.Internal.PositionMatrixEntry
    ( PositionMatrixEntry
    )

type Helpers =
    { nothing :: Maybe Unit
    , just    :: Unit -> Maybe Unit
    , position :: Number -> Number -> Number -> Position
    }

foreign import toPositionMatrixEntryImpl
    :: Helpers
    -> MoleculeKeyName
    -> Unit
    -> Maybe PositionMatrixEntry

toPositionMatrixEntry
    :: MoleculeKeyName
    -> Unit
    -> Maybe PositionMatrixEntry

toPositionMatrixEntry = toPositionMatrixEntryImpl
    { nothing: Nothing
    , just: Just
    , position: position
    }
