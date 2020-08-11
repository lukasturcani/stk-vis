module StkVis.StkVis.Internal.Reducer.Internal.InitializeUnsortedConstructedMolecules
    ( initializeUnsortedConstructedMolecules
    ) where

import Prelude
import StkVis.StkVis.Internal.StkVis as StkVis
import MoleculeBrowser.MoleculeBrowser as MoleculeBrowser
import MoleculeBrowser.Action as MB.Action

import MongoConfigurator.InitializeMoleculeBrowser.UnsortedConstructedMolecules
    ( InitializeUnsortedConstructedMolecules
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
            payload
        )
