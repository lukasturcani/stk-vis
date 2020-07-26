module StkVis.StkVis.Internal.Reducer.Internal.InitializeMoleculeBrowser
    ( initializeMoleculeBrowser
    ) where

import Prelude
import StkVis.StkVis.Internal.StkVis (StkVis (MoleculeBrowser))
import MoleculeBrowser.MoleculeBrowser (initialState, reducer)
import MoleculeBrowser.Action (initializeMoleculeBrowser)

import StkVis.InitializeMoleculeBrowser
    ( InitializeMoleculeBrowser
    , toMoleculeBrowser
    )

initializeMoleculeBrowser
    :: StkVis -> InitializeMoleculeBrowser -> StkVis
initializeMoleculeBrowser stkVis payload =
    MoleculeBrowser $ reducer initialState action
  where
    action = initializeMoleculeBrowser $ toMoleculeBrowser payload
