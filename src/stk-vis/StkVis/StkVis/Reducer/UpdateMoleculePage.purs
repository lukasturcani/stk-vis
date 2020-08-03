module StkVis.StkVis.Internal.Reducer.Internal.UpdateMoleculePage
    ( updateMoleculePage
    ) where

import StkVis.StkVis.Internal.StkVis as StkVis
import StkVis.UpdateMoleculePage (UpdateMoleculePage)
import MoleculeBrowser.MoleculeBrowser as MoleculeBrowser
import MoleculeBrowser.Action as MB.Action

updateMoleculePage
    :: StkVis.StkVis -> UpdateMoleculePage -> StkVis.StkVis

updateMoleculePage
    (StkVis.MongoConfigurator _)
    payload
    = StkVis.MoleculeBrowser $ MoleculeBrowser.reducer
        MoleculeBrowser.initialState
        (MB.Action )

updateMoleculePage
    (MoleculeBrowser ) payload =
