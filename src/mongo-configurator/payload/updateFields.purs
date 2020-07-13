module MongoConfigurator.Payload.UpdateFields
(
) where

import MongoConfigurator.MongoData (MongoData)
import MongoConfigurator.Payload.Data (Payload (UpdateFields))

updateFields :: MongoData -> Payload
updateFields data = UpdateFields data
