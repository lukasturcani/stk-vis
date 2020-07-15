module StkVis.StkVis.Internal.Reducer.Internal.UpdateFields
    ( updateFields
    ) where

import StkVis.StkVis.Internal.StkVis (StkVis (..))
import StkVis.UpdateFields as UpdateFields

import MongoConfigurator.MongoConfigurator
    (reducer) as MongoConfigurator

updateFields :: StkVis -> UpdateFields.UpdateFields -> StkVis
updateFields
    (MongoConfigurator configurator)
    action
    = MongoConfigurator newConfigurator

  where

    newConfigurator = MongoConfigurator.reducer configurator action'
    action' = UpdateFields.toConfigurator action
