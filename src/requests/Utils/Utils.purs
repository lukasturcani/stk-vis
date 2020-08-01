module Requests.Utils
    ( dataQuery
    , addPotitionMatrices
    ) where

import Prelude
import Data.Map (Map, toUnfoldable, lookup)
import Data.Tuple (Tuple (Tuple))
import Data.Maybe (Maybe)
import Data.Maybe.Utils as Maybe
import Mongo as Mongo
import Requests.MoleculeKey (MoleculeKeyName, MoleculeKeyValue)
import Requests.Molecule (Molecule)
import Requests.PositionMatrix (PositionMatrix, matrix)


foreign import dataQuery
    :: MoleculeKeyName -> Array MoleculeKeyValue -> Mongo.Query


addPositionMatrices
    :: Map MoleculeKeyValue Molecule
    -> Map MoleculeKeyValue PositionMatrix
    -> Array Molecule

addPositionMatrices molecules matrices = do
    (Tuple key molecule) <- toUnfoldable molecules
    positionMatrix <- Maybe.toArray (lookup key matrices)
    Maybe.toArray (molecule `addPositionMatrix` positionMatrix)

addPositionMatrix :: Molecule -> PositionMatrix -> Maybe Molecule
addPositionMatrix molecule positionMatrix = do
    let validated = toValidated molecule
    zipWith setPosition (Validated.atoms molecule) (matrix positionMatrix)

setPosition :: MoleculeAtom -> Postion -> Validated.


