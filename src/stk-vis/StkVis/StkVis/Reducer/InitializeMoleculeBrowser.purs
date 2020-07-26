module StkVis.StkVis.Internal.Reducer.Internal.InitializeMoleculeBrowser
    ( initializeMoleculeBrowser
    ) where

import Prelude
import StkVis.StkVis.Internal.StkVis (StkVis (MoleculeBrowser))
import MoleculeBrowser.MoleculeBrowser (initialState, reducer)

import StkVis.InitializeMoleculeBrowser
    ( InitializeMoleculeBrowser
    , toMoleculeBrowser
    )

initializeMoleculeBrowser
    :: StkVis -> InitializeMoleculeBrowser -> StkVis
initializeMoleculeBrowser
    stkVis
    payload
    = MoleculeBrowser $
        reducer initialState (toMoleculeBrowser payload)
