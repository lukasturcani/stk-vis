module StkVis.StkVis.Internal.Reducer.Internal.UpdateMoleculePage
    ( updateMoleculePage
    ) where

import Prelude
import StkVis.StkVis.Internal.StkVis as StkVis
import MoleculeBrowser.MoleculeBrowser as MoleculeBrowser
import MoleculeBrowser.Action as MB.Action

import StkVis.UpdateMoleculePage
    ( UpdateMoleculePage
    , toMoleculeBrowser
    )


updateMoleculePage
    :: StkVis.StkVis -> UpdateMoleculePage -> StkVis.StkVis

updateMoleculePage
    (StkVis.MongoConfigurator _)
    payload
    = StkVis.MoleculeBrowser $ MoleculeBrowser.reducer
        MoleculeBrowser.initialState
        (MB.Action.updateMoleculePage (toMoleculeBrowser payload))

updateMoleculePage
    (StkVis.MoleculeBrowser browser)
    payload
    = StkVis.MoleculeBrowser $ MoleculeBrowser.reducer
        browser
        (MB.Action.updateMoleculePage (toMoleculeBrowser payload))
