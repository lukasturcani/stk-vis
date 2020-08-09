module StkVis.StkVis.Internal.Reducer.Internal.InitializeUnsortedBuildingBlocks
    ( initializeUnsortedBuildingBlocks
    ) where

import StkVis.StkVis.Internal.StkVis as StkVis
import MoleculeBrowser.MoleculeBrowser as MoleculeBrowser
import MoleculeBrowser.Action as MB.Action

initializeUnsortedBuildingBlocks
    :: StkVis.StkVis
    -> InitializeUnsortedBuildingBlocks
    -> StkVis.StkVis

initializeUnsortedBuildingBlocks
    stkVis
    payload
    = stkVis.MoleculeBrowser $ MoleculeBrowser.reducer
        MoleculeBrowser.initialState
        (MB.Action.initializeUnsortedBuildingBlocks
            (toMoleculeBrowser payload)
        )
