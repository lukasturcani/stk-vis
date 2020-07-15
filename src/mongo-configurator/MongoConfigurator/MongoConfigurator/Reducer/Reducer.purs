module MongoConfigurator.MongoConfigurator.Internal.Reducer
    ( reducer
    ) where

import MongoConfigurator.Action (Action)
import MongoConfigurator.Payload (Payload (..))
import MongoConfigurator.MongoConfigurator.Internal.MongoConfigurator
    ( MongoConfigurator
    )

import MongoConfigurator.MongoConfigurator.Internal.Reducer.Internal.UpdateFields
    (updateFields)


reducer :: MongoConfigurator -> Action -> MongoConfigurator
reducer
    configurator
    ({ payload: (UpdateFields payload) })
    = updateFields configurator payload
