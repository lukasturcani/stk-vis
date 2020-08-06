module MoleculeBrowser.SelectMolecule
    ( SelectMolecule
    , selectMolecule
    , toMolecules
    ) where

import Molecules.SelectMolecule as Base
import Molecules.Molecule (Molecule)

newtype SelectMolecule = SelectMolecule Base.SelectMolecule

selectMolecule :: Int -> Molecule -> SelectMolecule
selectMolecule id molecule = SelectMolecule
    (Base.selectMolecule id molecule)

toMolecules :: SelectMolecule -> Base.SelectMolecule
toMolecules (SelectMolecule payload) = payload
