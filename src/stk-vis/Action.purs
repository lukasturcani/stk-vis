module StkVis.Action
    ( Action
    , updateFields
    ) where

import MongoConfigurator.UpdateFields.MongoData (MongoData)
import StkVis.Payload (Payload, updateFields) as Payload

type Action =
    { type    :: String
    , payload :: Payload.Payload
    }

updateFields :: MongoData -> Action
updateFields data' =
    { type: "UPDATE_FIELDS"
    , payload: Payload.updateFields data'
    }
