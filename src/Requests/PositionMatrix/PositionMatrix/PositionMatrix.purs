module Requests.PositionMatrix
    ( module Exports
    , fromEntry
    , key
    , matrix
    ) where

import Prelude
import Data.Maybe (Maybe)
import Requests.PositionMatrix.Internal.Data as Data
import Requests.PositionMatrix.Internal.FromEntry as FromEntry
import Requests.MoleculeKey (MoleculeKeyName, MoleculeKeyValue)
import ValidatedMolecule.Position (Position)

import Requests.PositionMatrix.Internal.Data
    ( PositionMatrix
    ) as Exports

key :: Exports.PositionMatrix -> MoleculeKeyValue
key = Data.key

matrix :: Exports.PositionMatrix -> Array Position
matrix = Data.matrix

fromEntry
    :: MoleculeKeyName
    -> Unit
    -> Maybe Exports.PositionMatrix

fromEntry = FromEntry.fromEntry
