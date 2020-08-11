module StkVis.StkVis.Internal.Reducer.Internal.InitializeUnsortedAll
    ( initializeUnsortedAll
    ) where

import Prelude
import StkVis.StkVis.Internal.StkVis as StkVis
import MoleculeBrowser.MoleculeBrowser as MoleculeBrowser
import MoleculeBrowser.Action as MB.Action

import MoleculeBrowser.Initialize.UnsortedAll
    ( InitializeUnsortedAll
    )

initializeUnsortedAll
    :: StkVis.StkVis
    -> InitializeUnsortedAll
    -> StkVis.StkVis

initializeUnsortedAll
    stkVis
    payload
    = StkVis.MoleculeBrowser $ MoleculeBrowser.reducer
        MoleculeBrowser.initialState
        (MB.Action.initializeUnsortedAllMoleculeBrowser payload)
