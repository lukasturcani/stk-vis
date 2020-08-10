module MoleculeBrowser.MoleculeBrowser.Internal.Reducer.Internal.SelectMolecule
    ( selectMolecule
    ) where

import MoleculeBrowser.MoleculeBrowser.Internal.MoleculeBrowser
    ( MoleculeBrowser (MoleculeBrowser)
    )

import Molecules.SelectMolecule
    ( SelectMolecule
    )

import Molecules.Molecules as Molecules
import Molecules.Action as Action

selectMolecule :: MoleculeBrowser -> SelectMolecule -> MoleculeBrowser
selectMolecule
    (MoleculeBrowser { _requestManager, _molecules })
    payload
    = MoleculeBrowser
        { _requestManager
        , _molecules:
            Molecules.reducer
                _molecules
                (Action.selectMolecule payload)
        }
