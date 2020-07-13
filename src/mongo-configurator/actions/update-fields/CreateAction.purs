module MongoConfigurator.UpdateFields.Internal.CreateAction
    ( createAction
    ) where

import MongoConfigurator.UpdateFields.Internal.MongoData (MongoData)
import MongoConfigurator.UpdateFields.Internal.Action (Action)

createAction :: MongoData -> Action
createAction data' = { type: "UPDATE_FIELDS",  payload: data' }
