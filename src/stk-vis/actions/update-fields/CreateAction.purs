module StkVis.UpdateFields.Internal.CreateAction
    ( createAction
    ) where

import StkVis.UpdateFields.Internal.MongoData (MongoData)
import StkVis.UpdateFields.Internal.Action (Action (Action))

createAction :: MongoData -> Action
createAction data' = Action data'
