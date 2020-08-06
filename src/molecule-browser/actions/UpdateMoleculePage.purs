module MoleculeBrowser.UpdateMoleculePage
    ( UpdateMoleculePage
    , toRequestManager
    , initializeMolecules
    , updateMoleculePage
    ) where

import Prelude
import RequestManager.UpdateMoleculePage as Base
import Molecules.InitializeMolecules as InitMols

newtype UpdateMoleculePage = UpdateMoleculePage Base.UpdateMoleculePage

updateMoleculePage :: Base.UpdateMoleculePage -> UpdateMoleculePage
updateMoleculePage = UpdateMoleculePage

toRequestManager :: UpdateMoleculePage -> Base.UpdateMoleculePage
toRequestManager (UpdateMoleculePage payload) = payload

initializeMolecules :: UpdateMoleculePage -> InitializeMolecules
initializeMolecules (UpdateMoleculePage payload)
    = InitMols.initializeMolecules molecules (Base.columns payload)
  where
    moleculeKey = Base.moleculeKey payload
    molecules = map (_toMolecule moleculeKey) (Base.molecules payload)

_toMolecule
    :: MoleculeKeyName -> Requests.Molecule -> Molecules.Molecule

_toMolecule moleculeKey molecule =
    Molecules.molecule validated properties
  where
    validated =Requests.toValidated molecule
    properties =
        insert
            moleculeKey
            (Requests.key molecule)
            (Requests.properties molecule)

