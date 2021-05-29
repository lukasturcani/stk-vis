module Requests.Collection
    ( module Exports
    , name
    , get
    , fromEntries
    ) where

import Mongo as Mongo
import Data.Maybe (Maybe)
import Requests.MoleculeKey (MoleculeKeyName, MoleculeKeyValue)

import Requests.Collection.Internal.Data
    ( Collection
    , CollectionValue
    , CollectionName
    ) as Exports

import Requests.Collection.Internal.Data
    ( get
    , name
    , fromEntries
    ) as Data

name :: Exports.Collection -> Exports.CollectionName
name = Data.name

get
    :: Exports.Collection
    -> MoleculeKeyValue
    -> Maybe Exports.CollectionValue

get = Data.get

fromEntries
    :: MoleculeKeyName
    -> Exports.CollectionName
    -> Array Mongo.Entry
    -> Exports.Collection
fromEntries = Data.fromEntries
