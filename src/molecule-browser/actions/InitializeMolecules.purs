module MoleculeBrowser.InitializeMolecules
    ( InitializeMolecules
    , initializeMolecules
    , toMolecules
    ) where

import Molecules.InitializeMolecules as Base
import SelectingCollection (SelectingCollection)
import Molecules.Molecule (Molecule)

newtype InitializeMolecules
    = InitializeMolecules Base.InitializeMolecules

initializeMolecules
    :: SelectingCollection Molecule
    -> Array String
    -> InitializeMolecules

initializeMolecules molecules columns
    = InitializeMolecules (Base.initializeMolecules molecules columns)

toMolecules :: InitializeMolecules -> Base.InitializeMolecules
toMolecules (InitializeMolecules base) = base
