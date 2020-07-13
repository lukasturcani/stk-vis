module StkVis.UpdateFields.Internal.CreateAction
    ( createAction
    ) where

import MongoConfigurator.UpdateFields as UpdateFields
import StkVis.UpdateFields.Internal.Action (Action (Action))

createAction :: UpdateFields.Action -> Action
createAction action = Action action
