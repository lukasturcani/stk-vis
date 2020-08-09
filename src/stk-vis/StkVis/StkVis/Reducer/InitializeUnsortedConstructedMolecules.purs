module StkVis.StkVis.Internal.Reducer.Internal.InitializeUnsortedConstructedMolecules
    ( initializeUnsortedConstructedMolecules
    ) where

import Prelude
import StkVis.StkVis.Internal.StkVis as StkVis
import MoleculeBrowser.MoleculeBrowser as MoleculeBrowser
import MoleculeBrowser.Action as MB.Action

import StkVis.InitializeMoleculeBrowser.UnsortedConstructedMolecules
    ( InitializeUnsortedConstructedMolecules
    , toMoleculeBrowser
    )

initializeUnsortedConstructedMolecules
    :: StkVis.StkVis
    -> InitializeUnsortedConstructedMolecules
    -> StkVis.StkVis

initializeUnsortedConstructedMolecules
    stkVis
    payload
    = StkVis.MoleculeBrowser $ MoleculeBrowser.reducer
        MoleculeBrowser.initialState
        (MB.Action.initializeUnsortedConstructedMoleculesMoleculeBrowser
            (toMoleculeBrowser payload)
        )
