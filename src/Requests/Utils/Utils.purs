module Requests.Utils
    ( dataQuery
    , addValues
    ) where

import Prelude
import Data.Array as Array
import Data.Map (Map)
import Data.Map as Map
import Data.Tuple (Tuple (Tuple))
import Data.Maybe (Maybe (Just, Nothing))
import Mongo as Mongo
import Requests.MoleculeKey (MoleculeKeyName, MoleculeKeyValue)
import Requests.Collection (Collection)
import Requests.Collection as Collection
import Requests.Molecule (Molecule)
import Requests.Molecule as Molecule

foreign import dataQuery
    :: MoleculeKeyName
    -> Array MoleculeKeyValue
    -> Mongo.Query

addValues
    :: Array Molecule
    -> Array Collection
    -> Array Molecule

addValues molecules collections = do
    molecule <- molecules

    let
        collectionProperties =
            getCollectionProperties molecule collections

        properties =
            Map.union
                (Molecule.properties molecule)
                collectionProperties

    pure $
        Molecule.fromValidated
            (Molecule.constructed molecule)
            (Molecule.key molecule)
            properties
            (Molecule.toValidated molecule)

  where

    getCollectionProperties
        :: Molecule
        -> Array Collection
        -> Map String String

    getCollectionProperties molecule collections' =
        Map.fromFoldable $
        Array.concatMap (value (Molecule.key molecule)) collections'

    value key collection = case Collection.get collection key of
        Just x -> [Tuple (Collection.name collection) x]
        Nothing -> []
