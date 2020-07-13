module StkVis.Reducers.Internal.UpdateFields
    ( updateFields
    ) where

import MongoConfigurator.Reducers (updateFields) as MongoConfigurator
import StkVis.UpdateFields as UpdateFields
import StkVis.Internal.Data (StkVis (..))

updateFields :: StkVis -> UpdateFields.Action -> StkVis
updateFields
    (MongoConfigurator configurator)
    action
    = MongoConfigurator newConfigurator

  where

    newConfigurator
        = MongoConfigurator.updateFields configurator action'

    action' = UpdateFields.toConfigurator action
