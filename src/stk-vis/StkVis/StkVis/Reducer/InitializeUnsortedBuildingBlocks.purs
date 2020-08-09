module StkVis.StkVis.Internal.Reducer.Internal.InitializeUnsortedBuildingBlocks
    ( initializeUnsortedBuildingBlocks
    ) where

import Prelude
import StkVis.StkVis.Internal.StkVis as StkVis
import MoleculeBrowser.MoleculeBrowser as MoleculeBrowser
import MoleculeBrowser.Action as MB.Action

import StkVis.InitializeMoleculeBrowser.UnsortedBuildingBlocks
    ( InitializeUnsortedBuildingBlocks
    , toMoleculeBrowser
    )

initializeUnsortedBuildingBlocks
    :: StkVis.StkVis
    -> InitializeUnsortedBuildingBlocks
    -> StkVis.StkVis

initializeUnsortedBuildingBlocks
    stkVis
    payload
    = StkVis.MoleculeBrowser $ MoleculeBrowser.reducer
        MoleculeBrowser.initialState
        (MB.Action.initializeUnsortedBuildingBlocksMoleculeBrowser
            (toMoleculeBrowser payload)
        )
