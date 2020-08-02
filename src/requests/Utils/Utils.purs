module Requests.Utils
    ( dataQuery
    , addPositionMatrices
    ) where

import Prelude
import Data.Array (zipWith)
import Data.Map (Map, toUnfoldable, lookup)
import Data.Tuple (Tuple (Tuple))
import Data.Maybe (Maybe)
import Data.Maybe.Utils as Maybe
import Mongo as Mongo
import Requests.MoleculeKey (MoleculeKeyName, MoleculeKeyValue)
import Requests.PositionMatrix (PositionMatrix, matrix)
import ValidatedMolecule.Position as Position
import ValidatedMolecule as Validated

import Requests.Molecule
    ( Molecule
    , toValidated
    , key
    , properties
    , fromValidated
    )


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
    newMolecule <- Validated.molecule atoms bonds
    pure $ fromValidated
        (key molecule)
        (properties molecule)
        newMolecule
  where
    validated = toValidated molecule
    atoms =
        zipWith
        setPosition
        (Validated.atoms validated)
        (matrix positionMatrix)
    bonds = map toBond (Validated.bonds validated)

    setPosition
        :: Validated.MoleculeAtom
        -> Position.Position
        -> Validated.Atom

    setPosition atom position =
        Validated.atom (Validated.chemicalSymbol atom) position

    toBond :: Validated.MoleculeBond -> Validated.Bond
    toBond bond = Validated.bond order atom1Id atom2Id
      where
        order = Validated.order bond
        atom1Id = Validated.id $ Validated.atom1 bond
        atom2Id = Validated.id $ Validated.atom2 bond

addValues :: Array Molecule -> Array Collection -> Array Molecule
addValues molecules collections = do
    molecule <- molecules
    pure (addValues_ molecule collections)
  where
    addValues_ molecule collections =
        concatMap (value (key molecule)) collections

    value key collection = case get collection key of
        Just x -> [Tuple (name collection) x]
        Nothing -> []

