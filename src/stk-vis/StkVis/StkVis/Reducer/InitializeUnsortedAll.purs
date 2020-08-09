module StkVis.StkVis.Internal.Reducer.Internal.InitializeUnsortedAll
    ( initializeUnsortedAll
    ) where

import StkVis.StkVis.Internal.StkVis as StkVis
import MoleculeBrowser.MoleculeBrowser as MoleculeBrowser
import MoleculeBrowser.Action as MB.Action

initializeUnsortedAll
    :: StkVis.StkVis -> InitializeUnsortedAll -> StkVis.StkVis

initializeUnsortedAll
    stkVis
    payload
    = stkVis.MoleculeBrowser $ MoleculeBrowser.reducer
        MoleculeBrowser.initialState
        (MB.Action.initializeUnsortedAll (toMoleculeBrowser payload))
