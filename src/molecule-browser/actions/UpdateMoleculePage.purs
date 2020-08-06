module MoleculeBrowser.UpdateMoleculePage
    ( UpdateMoleculePage
    , toRequestManager
    , initializeMolecules
    , updateMoleculePage
    ) where

import Prelude
import RequestManager.UpdateMoleculePage as Base
import Molecules.InitializeMolecules as InitMols
import Molecules.Molecule as Molecule
import Requests.Molecule as Request
import Data.Map as Map

newtype UpdateMoleculePage = UpdateMoleculePage Base.UpdateMoleculePage

updateMoleculePage :: Base.UpdateMoleculePage -> UpdateMoleculePage
updateMoleculePage = UpdateMoleculePage

toRequestManager :: UpdateMoleculePage -> Base.UpdateMoleculePage
toRequestManager (UpdateMoleculePage payload) = payload

initializeMolecules
    :: UpdateMoleculePage -> InitMols.InitializeMolecules

initializeMolecules (UpdateMoleculePage payload)
    = InitMols.initializeMolecules molecules (Base.columns payload)
  where
    moleculeKey = Base.moleculeKey payload
    molecules = map (_toMolecule moleculeKey) (Base.molecules payload)

_toMolecule
    :: String -> Request.Molecule -> Molecule.Molecule

_toMolecule moleculeKey molecule =
    Molecule.molecule validated properties
  where
    validated =Request.toValidated molecule
    properties =
        Map.insert
            moleculeKey
            (Request.key molecule)
            (Request.properties molecule)

