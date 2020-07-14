module StkVis.StkVis
    ( module Exports
    , initialState
    ) where

import StkVis.StkVis.Internal (StkVis) as Exports
import StkVis.StkVis.Internal.InitialState
    (initialState) as InitialState

initialState :: Exports.StkVis
initialState = InitialState.initialState
