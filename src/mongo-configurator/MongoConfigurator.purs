module MongoConfigurator
    ( module Exports
    , initialState
    ) where


import MongoConfigurator.Internal.Data (MongoConfigurator) as Exports
import MongoConfigurator.Internal.InitialState as InitialState

initialState :: Exports.MongoConfigurator
initialState = InitialState.initialState
