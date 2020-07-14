module StkVis.StkVis.Internal.InitialState
    ( initialState
    ) where

import StkVis.StkVis.Internal (StkVis (MongoConfigurator))
import MongoConfigurator.MongoConfigurator
    (initialState) as MongoConfigurator


initialState :: StkVis
initialState = MongoConfigurator MongoConfigurator.initialState
