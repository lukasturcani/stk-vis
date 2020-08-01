module Requests.PositionMatrix.Internal.ToPositionMatrixEntry
    ( toPositionMatrixEntry
    ) where

import Mongo as Mongo
import Data.Maybe (Maybe (Nothing, Just))
import Requests.MoleculeKey (MoleculeKeyName)

import Requests.PositionMatrix.Internal.PositionMatrixEntry
    ( PositionMatrixEntry
    )

type Helpers =
    { nothing :: Maybe (MoleculeEntry Unit Unit)
    , just    :: Unit -> Maybe Unit
    }

foreign import toPositionMatrixEntryImpl
    :: Helpers
    -> MoleculeKeyName
    -> Mongo.Entry
    -> Maybe PositionMatrixEntry


toPositionMatrixEntry
    :: MoleculeKeyName -> Mongo.Entry -> Maybe PositionMatrixEntry

toPositionMatrixEntry = toPositionMatrixEntryImpl
    { nothing: Nothing
    , just: Just
    }
