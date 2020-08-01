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

data Client = Client
data Database = Database
data Query = Query
data Entry = Entry

foreign import client :: String -> Promise Client
foreign import database :: Client -> String -> Database
foreign import collections :: Database -> Promise (Array String)

foreign import find
    :: Database -> String -> Query -> Promise (Array Entry)

find' :: Database -> Query -> String -> Promise (Array Entry)
find' db query collection = find db collection query
