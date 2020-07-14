module StkVis
    ( module Exports
    , initialState
    , props
    ) where

import StkVis.Internal.Data (StkVis) as Exports
import StkVis.Internal.Data (Props, props) as Data
import StkVis.Internal.InitialState (initialState) as InitialState

initialState :: Exports.StkVis
initialState = InitialState.initialState

props :: Exports.StkVis -> Data.Props
props = Data.props
