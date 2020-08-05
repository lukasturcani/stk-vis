module Requests.SortedCollection
    ( SortedCollection
    , addMolecules
    , fromEntries
    , keys
    ) where

import Data.Maybe.Utils as Maybe
import Requests.MoleculeKey (MoleculeKeyValue)
import Requests.Molecule as Molecule

data SortedCollection = SortedCollection
    { _name   :: String
    , _values :: Map MoleculeKeyValue String
    , _order  :: Array MoleculeKeyValue
    }

keys :: SortedCollection -> Array MoleculeKeyValue
keys (SortedCollection { _order }) = _order

fromEntries :: MoleculeKeyName -> Array Mongo.Entry -> SortedCollection
fromEntries key entries = SortedCollection
    { _values:
    , _order:
    }

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

