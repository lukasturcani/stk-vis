module Requests.SortedCollection
    ( SortedCollection
    , CollectionName
    , addMolecules
    , fromEntries
    , keys
    ) where

import Prelude
import Data.Tuple (Tuple (Tuple))
import Data.Array as Array
import Data.Maybe.Utils as Maybe
import Data.Map as Map
import Requests.MoleculeKey (MoleculeKeyValue, MoleculeKeyName)
import Requests.Molecule as Molecule
import Requests.UnvalidatedValueQueryEntry (UnvalidatedValueQueryEntry)

type CollectionName = String
type CollectionValue = String

data SortedCollection = SortedCollection
    { _name   :: CollectionName
    , _values :: Map.Map MoleculeKeyValue CollectionValue
    , _order  :: Array MoleculeKeyValue
    }

keys :: SortedCollection -> Array MoleculeKeyValue
keys (SortedCollection { _order }) = _order

fromEntries
    :: CollectionName
    -> MoleculeKeyName
    -> Array UnvalidatedValueQueryEntry
    -> SortedCollection

fromEntries name key entries = SortedCollection
    { _name: name
    , _values: Map.fromFoldable entries'
    , _order: map (\(Tuple k _) -> k) entries'
    }
  where
    entries' = Array.concatMap (_toTuple Tuple key) entries

type TupleConstructor
    =  MoleculeKeyValue
    -> CollectionValue
    -> Tuple MoleculeKeyValue CollectionValue

foreign import _toTuple
    :: TupleConstructor
    -> MoleculeKeyName
    -> UnvalidatedValueQueryEntry
    -> Array (Tuple MoleculeKeyValue CollectionValue)

addMolecules
    :: SortedCollection
    -> Map.Map MoleculeKeyValue Molecule.Molecule
    -> Array Molecule.Molecule

addMolecules
    (SortedCollection { _name, _order, _values })
    molecules
    = do
        key <- _order
        value <- Maybe.toArray (Map.lookup key _values)
        molecule <- Maybe.toArray (Map.lookup key molecules)
        pure $ Molecule.fromValidated
            (Molecule.constructed molecule)
            (Molecule.key molecule)
            (Map.insert _name value (Molecule.properties molecule))
            (Molecule.toValidated molecule)
