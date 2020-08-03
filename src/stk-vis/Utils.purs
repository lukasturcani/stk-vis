module StkVis.Utils.UnsortedAll
    ( updateMoleculePage
    ) where

import Prelude
import Effect (Effect)
import Requests.UnsortedAll (Result (..))
import Requests.Molecule (Molecule, properties) as Requests
import Molecules.Molecule (Molecule, molecule) as Molecules
import Data.Array ((:))
import StkVis.Action as Action

type MoleculeKeyName = String

updateMoleculePage
    :: (Action.Action -> Effect Unit)
    -> MoleculeKeyName
    -> Result
    -> Effect Unit

updateMoleculePage
    dispatch
    moleculeKey
    (Result
        { valueCollections
        , molecules
        , pageKind
        }
    )
    = do
        let
            action = Action.updateMoleculePage
                { molecules: map _toMolecule molecules
                , columns: moleculeKey : valueCollections
                }

        dispatch action

_toMolecule :: Requests.Molecule -> Molecules.Molecule
_toMolecule molecule =
    Molecules.molecule (Requests.properties molecule)
