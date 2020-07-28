module Mongo
    ( Client
    , Database
    , Query
    , Entry
    , client
    , database
    , collections
    , find
    ) where

data Client = Client
data Database = Database
data Query = Query
data Entry = Entry

foreign import client :: String -> Promise Client
foreign import database :: Client -> String -> Promise Database
foreign import collections :: Database -> Promise (Array String)

foreign import find
    :: Database -> String -> Query -> Promise (Array Entry)
