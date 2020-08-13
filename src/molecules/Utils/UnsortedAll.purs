module Molecules.Utils.UnsortedAll
    ( initializeMolecules
    ) where

import Prelude
import Effect (Effect)
import Requests.UnsortedAll (Result (..))
import Data.Array ((:))
import Data.Map (insert)
import Requests.Molecule as Requests
import Molecules.Molecule (Molecule, molecule) as Molecules
import Molecules.Action as Action
import Molecules.InitializeMolecules as InitializeMolecules

type MoleculeKeyName = String

initializeMolecules
    :: (Action.Action -> Effect Unit)
    -> MoleculeKeyName
    -> Result
    -> Effect Unit

initializeMolecules
    dispatch
    moleculeKey
    (Result
        { valueCollections
        , molecules
        }
    )
    = dispatch action
  where
    action = Action.initializeMolecules payload
    payload = InitializeMolecules.initializeMolecules
        (map (_toMolecule moleculeKey) molecules)
        (moleculeKey : valueCollections)

_toMolecule
    :: MoleculeKeyName -> Requests.Molecule -> Molecules.Molecule

_toMolecule moleculeKey molecule =
    Molecules.molecule constructed validated properties
  where
    constructed = Requests.constructed molecule
    validated = Requests.toValidated molecule
    properties =
        insert
            moleculeKey
            (Requests.key molecule)
            (Requests.properties molecule)

