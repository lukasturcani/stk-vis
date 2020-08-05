module Requests.SortedCollection
    ( SortedCollection
    , CollectionName
    , addMolecules
    , fromEntries
    , keys
    ) where

import Data.Tuple (Tuple (Tuple))
import Data.Array as Array
import Data.Maybe.Utils as Maybe
import Requests.MoleculeKey (MoleculeKeyValue)
import Requests.Molecule as Molecule
import Requests.MoleculeKey (MoleculeKeyName)

type CollectionName = String

data SortedCollection = SortedCollection
    { _name   :: CollectionName
    , _values :: Map MoleculeKeyValue String
    , _order  :: Array MoleculeKeyValue
    }

keys :: SortedCollection -> Array MoleculeKeyValue
keys (SortedCollection { _order }) = _order

fromEntries
    :: CollectionName
    -> MoleculeKeyName
    -> Array Mongo.Entry
    -> SortedCollection

fromEntries name key entries = SortedCollection
    { _name: name
    , _values: Map.fromFoldable entries'
    , _order: map (\(Tuple k _) -> k) entries'
    }
  where
    entries' = Array.concatMap (_toTuple Tuple key) entries

foreign import _toTuple
    :: (String -> String -> Tuple String String)
    -> MoleculeKeyName
    -> Mongo.Entry
    -> Array (Tuple String String)

addMolecules
    :: SortedCollection
    -> Map MoleculeKeyValue Molecule.Molecule
    -> Array Molecule.Molecule

addMolecules
    (SortedCollection { _name, _order, _values })
    molecules
    = do
        key <- _order
        value <- Maybe.toArray (lookup key _values)
        molecule <- Maybe.toArray (lookup key molecules)
        pure $ Molecule.fromValidated
            (Molecule.key molecule)
            (insert _name value (Molecule.properties molecule))
            (Molecule.toValidated molecule)

