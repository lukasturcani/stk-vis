module StkVis.StkVis.Reducers.Internal.UpdateFields
    ( updateFields
    ) where

import StkVis.StkVis.Internal (StkVis (..))
import StkVis.UpdateFields as UpdateFields
import MongoConfigurator.MongoConfigurator.Reducers
    (updateFields) as MongoConfigurator

updateFields :: StkVis -> UpdateFields.Action -> StkVis
updateFields
    (MongoConfigurator configurator)
    action
    = MongoConfigurator newConfigurator

  where

    newConfigurator
        = MongoConfigurator.updateFields configurator action'

    action' = UpdateFields.toConfigurator action
