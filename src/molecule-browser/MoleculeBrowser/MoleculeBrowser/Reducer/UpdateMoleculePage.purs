module MoleculeBrowser.MoleculeBrowser.Internal.Reducer.Internal.UpdateMoleculePage
    ( updateMoleculePage
    ) where

import MoleculeBrowser.MoleculeBrowser.Internal.MoleculeBrowser
    ( MoleculeBrowser (..)
    )

import MoleculeBrowser.UpdateMoleculePage.UpdateMoleculePage
    ( UpdateMoleculePage
    , molecules
    , columns
    )

import Molecules.Molecules as Molecules
import Molecules.InitializeMolecules as InitializeMolecules
import Molecules.Action as Molecules.Action

updateMoleculePage
    :: MoleculeBrowser -> UpdateMoleculePage -> MoleculeBrowser

updateMoleculePage
    (MoleculeBrowser
        { _requestManager
        , _molecules
        }
    )
    payload
    = MoleculeBrowser
        { _requestManager: _requestManager
        , _molecules: newMolecules
        }
  where
    newMolecules = Molecules.reducer _molecules action
    action = Molecules.Action.initializeMolecules
        (InitializeMolecules.initializeMolecules
            (molecules payload)
            (columns payload)
        )
