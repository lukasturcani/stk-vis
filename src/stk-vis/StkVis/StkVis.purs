module StkVis.StkVis
    ( StkVis.StkVis
    , initialState
    ) where

import StkVis.StkVis.Internal (StkVis) as StkVis
import StkVis.StkVis.Internal.InitialState
    (initialState) as InitialState

initialState :: StkVis.StkVis
initialState = InitialState.initialState
