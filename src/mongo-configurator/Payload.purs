module MongoConfigurator.Payload
    ( Payload (..)
    , updateFields
    )

import MongoConfigurator.UpdateFields.UpdateFields
    ( UpdateFields
    , updateFields
    ) as UpdateFields

data Payload
    = UpdateFields UpdateFields.UpdateFields

updateFields :: MongoData -> Payload
updateFields = UpdateFields <<< UpdateFields.updateFields
