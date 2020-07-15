module StkVis.Payload
    ( Payload (..)
    , updateFields
    ) where

import StkVis.UpdateFields.UpdateFields
    ( UpdateFields
    , updateFields
    ) as UpdateFields

data Payload
    = UpdateFields UpdateFields.UpdateFields

updateFields :: MongoData -> Payload
updateFields = UpdateFields <<< UpdateFields.updateFields
