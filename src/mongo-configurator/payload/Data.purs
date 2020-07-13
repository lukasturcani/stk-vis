module MongoConfigurator.Payload.Data
( Payload (..)
) where

import MongoData (MongoData)

data Payload
    = UpdateFields MongoData
