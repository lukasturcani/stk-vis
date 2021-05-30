module Mongo
    ( Client
    , Database
    , Cursor
    , CollectionName
    , Query
    , AggregationQuery
    , client
    , database
    , collections
    , find
    , find'
    , findOne
    , skip
    , limit
    , toArray
    , aggregate
    ) where

import Effect.Promise (Promise)

type CollectionName = String

foreign import data Client           :: Type
foreign import data Database         :: Type
foreign import data Cursor           :: Type -> Type
foreign import data Query            :: Type -> Type
foreign import data AggregationQuery :: Type -> Type

foreign import client :: String -> Promise Client
foreign import database :: Client -> String -> Database
foreign import collections :: Database -> Promise (Array String)
foreign import skip :: forall a. Int -> Cursor a -> Cursor a
foreign import limit :: forall a. Int -> Cursor a -> Cursor a
foreign import toArray :: forall a. Cursor a -> Promise (Array a)

foreign import find
    :: forall a
    .  Database
    -> CollectionName
    -> Query a
    -> Cursor a

foreign import findOne
    :: forall a
    .  Database
    -> CollectionName
    -> Query a
    -> Promise (Array a)

find' :: forall a. Database -> Query a -> CollectionName -> Cursor a
find' db query collection = find db collection query

foreign import aggregate
    :: forall a
    .  Database
    -> CollectionName
    -> AggregationQuery a
    -> Cursor a
