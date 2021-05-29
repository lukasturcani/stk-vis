module Mongo
    ( Client
    , Database
    , Cursor
    , CollectionName
    , Query
    , AggregationQuery
    , Entry
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
foreign import data Cursor           :: Type
foreign import data Query            :: Type
foreign import data AggregationQuery :: Type
foreign import data Entry            :: Type

foreign import client :: String -> Promise Client
foreign import database :: Client -> String -> Database
foreign import collections :: Database -> Promise (Array String)
foreign import find :: Database -> CollectionName -> Query -> Cursor
foreign import skip :: Int -> Cursor -> Cursor
foreign import limit :: Int -> Cursor -> Cursor
foreign import toArray :: Cursor -> Promise (Array Entry)

foreign import findOne
    :: Database
    -> CollectionName
    -> Query
    -> Promise (Array Entry)

find' :: Database -> Query -> CollectionName -> Cursor
find' db query collection = find db collection query

foreign import aggregate
    :: Database
    -> CollectionName
    -> AggregationQuery
    -> Cursor
