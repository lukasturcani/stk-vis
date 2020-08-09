module StkVis.StkVis.Internal.Reducer.Internal.SelectMolecule
    ( selectMolecule
    ) where

import Prelude
import StkVis.StkVis.Internal.StkVis as StkVis
import MoleculeBrowser.MoleculeBrowser as MoleculeBrowser
import MoleculeBrowser.Action as Action
import StkVis.SelectMolecule (SelectMolecule, toMoleculeBrowser)

selectMolecule :: StkVis.StkVis -> SelectMolecule -> StkVis.StkVis
selectMolecule
    (StkVis.MoleculeBrowser browser)
    payload
    = StkVis.MoleculeBrowser $ MoleculeBrowser.reducer
        browser
        (Action.selectMolecule (toMoleculeBrowser payload))

selectMolecule stkVis payload = stkVis
