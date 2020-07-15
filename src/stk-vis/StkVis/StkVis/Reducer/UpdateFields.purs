module StkVis.StkVis.Internal.Reducer.Internal.UpdateFields
    ( updateFields
    ) where

import MongoConfigurator.Action (updateFields) as ConfiguratorAction
import StkVis.StkVis.Internal.StkVis (StkVis (..))
import StkVis.UpdateFields (UpdateFields, toConfigurator)

import MongoConfigurator.MongoConfigurator
    (reducer) as MongoConfigurator

updateFields :: StkVis -> UpdateFields -> StkVis
updateFields
    (MongoConfigurator configurator)
    payload
    = MongoConfigurator newConfigurator

  where

    newConfigurator = MongoConfigurator.reducer configurator action'
    action' = ConfiguratorAction.updateFields (toConfigurator payload)
