module MongoConfigurator.Payload.Data
    ( Payload (..)
    ) where

import MongoConfigurator.MongoData (MongoData)

data Payload
    = UpdateFields MongoData
