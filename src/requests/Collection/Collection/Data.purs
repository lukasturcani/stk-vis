module Requests.Collection.Internal.Data
    ( Collection (..)
    , CollectionValue
    , CollectionName
    , name
    , get
    ) where

import Prelude
import Data.Maybe (Maybe (Just, Nothing))
import Data.Map (Map, fromFoldable)
import Requests.MoleculeKey (MoleculeKeyValue, MoleculeKeyName)

type CollectionValue = String
type CollectionName = String

data Collection = Collection
    { _name   :: String
    , _values :: Map MoleculeKeyValue String
    }

name :: Collection -> CollectionName
name (Collection { _name }) = _name

get :: Collection -> MoleculeKeyValue -> Maybe CollectionValue
get (Collection { _values }) key = lookup key _values

type ValueEntry =
    { key   :: MoleculeKeyValue
    , value :: CollectionValue
    }

type Helpers =
    { nothing :: Maybe Unit
    , just    :: Unit -> Maybe Unit
    }

foreign import toEntry
    :: Helpers -> MoleculeKeyName -> Mongo.Entry -> Maybe ValueEntry

fromEntries
    :: MoleculeKeyName
    -> CollectionName
    -> Array Mongo.Entry
    -> Collection

fromEntries key name entries = Collection
    { _name: name
    , _values: fromFoldable valueEntries
    }
  where
    helpers = { nothing: Nothing, just: Just }
    valueEntries = map (toTuple <<< toEntry helpers key) entries
    toTuple {key, value} = Tuple key value
