module Mongo
    ( Client
    , Database
    , Query
    , Entry
    , client
    , database
    , collections
    , find
    , find'
    , skip
    , limit
    , toArray
    , aggregate
    ) where

import Effect.Promise (Promise)

type CollectionName = String

foreign import data Client   :: Type
foreign import data Database :: Type
foreign import data Cursor   :: Type
foreign import data Query    :: Type
foreign import data Entry    :: Type

foreign import client :: String -> Promise Client
foreign import database :: Client -> String -> Database
foreign import collections :: Database -> Promise (Array String)
foreign import find :: Database -> CollectionName -> Query -> Cursor
foreign import skip :: Int -> Cursor -> Cursor
foreign import limit :: Int -> Cursor -> Cursor
foreign import toArray :: Cursor -> Promise (Array Entry)

foreign import aggregate
    :: Database
    -> CollectionName
    -> Query
    -> Cursor

find' :: Database -> Query -> CollectionName -> Cursor
find' db query collection = find db collection query

