module MongoConfigurator.Action
    ( Action
    , updateFields
    ) where

import MongoConfigurator.UpdateFields.UpdateFields (UpdateFields)
import MongoConfigurator.Payload (Payload, updateFields) as Payload

type Action =
    { type    :: String
    , payload :: Payload.Payload
    }

updateFields :: UpdateFields -> Action
updateFields data' =
    { type: "UPDATE_FIELDS"
    , payload: Payload.updateFields data'
    }
