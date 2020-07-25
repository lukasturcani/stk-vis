module MongoConfigurator.MongoConfigurator
    ( module Exports
    , initialState
    , props
    , reducer
    ) where

import MongoConfigurator.Action (Action)

import MongoConfigurator.MongoConfigurator.Internal.MongoConfigurator
    ( MongoConfigurator
    ) as Exports

import MongoConfigurator.MongoConfigurator.Internal.InitialState
    ( initialState
    ) as InitialState

import MongoConfigurator.MongoConfigurator.Internal.Reducer
    ( reducer
    ) as Reducer

import MongoConfigurator.MongoConfigurator.Internal.Props
    ( Props
    ) as Exports

import MongoConfigurator.MongoConfigurator.Internal.Props
    ( props
    ) as Props

initialState :: Exports.MongoConfigurator
initialState = InitialState.initialState

props :: Exports.MongoConfigurator -> Exports.Props
props = Props.props

reducer
    :: Exports.MongoConfigurator -> Action -> Exports.MongoConfigurator
reducer = Reducer.reducer
