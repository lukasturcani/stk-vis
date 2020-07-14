module StkVis
    ( module Exports
    , initialState
    ) where

import StkVis.Internal.Data (StkVis) as Exports
import StkVis.Internal.InitialState (initialState) as InitialState

initialState :: Exports.StkVis
initialState = InitialState.initialState
