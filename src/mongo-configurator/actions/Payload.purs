module MongoConfigurator.Payload
    ( Payload (..)
    , updateFields
    ) where

import MongoConfigurator.UpdateFields.UpdateFields (UpdateFields)

data Payload
    = UpdateFields UpdateFields

updateFields :: UpdateFields -> Payload
updateFields = UpdateFields
