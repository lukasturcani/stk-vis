module StkVis.StkVis
    ( module Exports
    , initialState
    , props
    , reducer
    ) where

import StkVis.StkVis.Internal.StkVis (StkVis) as Exports
import StkVis.Action (Action)
import StkVis.StkVis.Internal.Reducer (reducer) as Reducer
import StkVis.StkVis.Internal.Props (Props (..)) as Exports
import StkVis.StkVis.Internal.Props (props) as Props

import StkVis.StkVis.Internal.InitialState
    (initialState) as InitialState

initialState :: Exports.StkVis
initialState = InitialState.initialState

reducer :: Exports.StkVis -> Action -> Exports.StkVis
reducer = Reducer.reducer

props :: Exports.StkVis -> Exports.Props
props = Props.props
