module MongoConfigurator.UpdateFields.CreateAction
    ( createAction
    ) where

import MongoConfigurator.MongoData (MongoData)
import MongoConfigurator.UpdateFields.Action (Action (Action))

createAction :: MongoData -> Action
createAction data' = Action data'
