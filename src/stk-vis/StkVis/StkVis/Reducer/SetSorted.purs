module StkVis.StkVis.Internal.Reducer.Internal.SetSorted
    ( setSorted
    ) where

import Prelude
import StkVis.StkVis.Internal.StkVis as StkVis
import MoleculeBrowser.MoleculeBrowser as MoleculeBrowser
import MoleculeBrowser.Action as Action
import StkVis.SetSorted (SetSorted, toRequestManager)

setSorted :: StkVis.StkVis -> SetSorted -> StkVis.StkVis
setSorted
    (StkVis.MoleculeBrowser browser)
    payload
    = StkVis.MoleculeBrowser $ MoleculeBrowser.reducer
        browser
        (Action.setSorted (toRequestManager payload))

setSorted stkVis payload = stkVis
