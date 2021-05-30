module Requests.Utils
    ( ConstructedMoleculeCollectionName
    , dataQuery
    , moleculeQuery
    , addPositionMatrices
    , addValues
    ) where

import Prelude
import Data.Array (zipWith, concatMap)
import Data.Map (Map, toUnfoldable, lookup, fromFoldable)
import Data.Tuple (Tuple (Tuple))
import Data.Maybe (Maybe (Just, Nothing))
import Data.Maybe.Utils as Maybe
import Mongo as Mongo
import Requests.MoleculeKey (MoleculeKeyName, MoleculeKeyValue)
import Requests.PositionMatrix (PositionMatrix, matrix)
import ValidatedMolecule.Position as Position
import ValidatedMolecule as Validated
import Requests.Collection as Collection
import Requests.Molecule as Molecule

import Requests.Molecule
    ( Molecule
    , toValidated
    , key
    , properties
    , constructed
    , fromValidated
    )

foreign import dataQuery
    :: forall a
    .  MoleculeKeyName
    -> Array MoleculeKeyValue
    -> Mongo.Query

type ConstructedMoleculeCollectionName = String

foreign import moleculeQuery
    :: MoleculeKeyName
    -> ConstructedMoleculeCollectionName
    -> Array MoleculeKeyValue
    -> Mongo.AggregationQuery


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
        (constructed molecule)
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

addValues
    :: Array Molecule.Molecule
    -> Array Collection.Collection
    -> Array Molecule.Molecule

addValues molecules collections = do
    molecule <- molecules
    pure (addValues_ molecule collections)
  where
    addValues_ molecule collections' =
        Molecule.fromValidated
            (constructed molecule)
            (key molecule)
            (properties molecule collections')
            (toValidated molecule)

    properties molecule collections' =
        fromFoldable $ concatMap (value (key molecule)) collections'

    value key collection = case Collection.get collection key of
        Just x -> [Tuple (Collection.name collection) x]
        Nothing -> []
