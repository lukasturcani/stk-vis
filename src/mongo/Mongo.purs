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
    ) where

import Effect.Promise (Promise)

foreign import data Client   :: Type
foreign import data Database :: Type
foreign import data Query    :: Type
foreign import data Entry    :: Type

foreign import client :: String -> Promise Client
foreign import database :: Client -> String -> Database
foreign import collections :: Database -> Promise (Array String)

foreign import find
    :: Database -> String -> Query -> Promise (Array Entry)

find' :: Database -> Query -> String -> Promise (Array Entry)
find' db query collection = find db collection query
