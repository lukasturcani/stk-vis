module MongoConfigurator.UpdateFields.Internal.CreateAction
    ( createAction
    ) where

import MongoConfigurator.Internal.MongoData (MongoData)
import MongoConfigurator.UpdateFields.Internal.Action (Action (Action))

createAction :: MongoData -> Action
createAction data' = Action data'
