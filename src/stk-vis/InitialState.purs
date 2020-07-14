module StkVis.Internal.InitialState
    ( initialState
    ) where

import MongoConfigurator (initialState) as MongoConfigurator
import StkVis.Internal.Data (StkVis (MongoConfigurator))

initialState :: StkVis
initialState = MongoConfigurator MongoConfigurator.initialState
