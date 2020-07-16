module StkVis.Payload
    ( Payload (..)
    , updateFields
    ) where

import Prelude
import MongoConfigurator.UpdateFields.MongoData (MongoData)
import StkVis.UpdateFields
    ( UpdateFields
    , updateFields
    ) as UpdateFields

data Payload
    = UpdateFields UpdateFields.UpdateFields

updateFields :: MongoData -> Payload
updateFields = UpdateFields <<< UpdateFields.updateFields
