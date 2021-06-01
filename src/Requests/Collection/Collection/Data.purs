module Requests.Collection.Internal.Data
    ( Collection (..)
    , CollectionValue
    , CollectionName
    , name
    , get
    , fromEntries
    ) where

import Prelude
import Data.Array (concat)
import Data.Map (Map, fromFoldable, lookup)
import Data.Maybe (Maybe)
import Data.Tuple (Tuple (Tuple))
import Requests.MoleculeKey (MoleculeKeyValue, MoleculeKeyName)
import Requests.UnvalidatedValueQueryEntry (UnvalidatedValueQueryEntry)

type CollectionValue = String
type CollectionName = String

data Collection = Collection
    { _name      :: String
    , _values    :: Map MoleculeKeyValue CollectionValue
    }

name :: Collection -> CollectionName
name (Collection { _name }) = _name

get :: Collection -> MoleculeKeyValue -> Maybe CollectionValue
get (Collection { _values }) key = lookup key _values

type Helpers =
    { tuple :: Unit -> Unit -> Tuple Unit Unit
    }

foreign import toEntry
    :: Helpers
    -> MoleculeKeyName
    -> UnvalidatedValueQueryEntry
    -- Returns an empty array if conversion fails and an array of
    -- one tuple if it is successful.
    -> Array (Tuple MoleculeKeyValue CollectionValue)

fromEntries
    :: MoleculeKeyName
    -> CollectionName
    -> Array UnvalidatedValueQueryEntry
    -> Collection

fromEntries key name' entries = Collection
    { _name: name'
    , _values: fromFoldable valueEntries
    }
  where
    helpers = { tuple: Tuple }
    valueEntries = concat $ map (toEntry helpers key) entries
