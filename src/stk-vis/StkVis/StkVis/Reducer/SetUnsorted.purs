module StkVis.StkVis.Internal.Reducer.Internal.SetUnsorted
    ( setUnsorted
    ) where

import Prelude
import StkVis.StkVis.Internal.StkVis as StkVis
import MoleculeBrowser.MoleculeBrowser as MoleculeBrowser
import MoleculeBrowser.Action as Action
import RequestManager.SetUnsorted (SetUnsorted)

setUnsorted :: StkVis.StkVis -> SetUnsorted -> StkVis.StkVis
setUnsorted
    (StkVis.MoleculeBrowser browser)
    payload
    = StkVis.MoleculeBrowser $ MoleculeBrowser.reducer
        browser
        (Action.setUnsorted payload

setUnsorted stkVis payload = stkVis
