module MoleculeBrowser.SelectMolecule
    ( SelectMolecule
    , selectMolecule
    , toMolecules
    ) where

import Molecules.SelectMolecule as Base

newtype SelectMolecule = SelectMolecule Base.SelectMolecule

selectMolecule :: Base.SelectMolecule -> SelectMolecule
selectMolecule = SelectMolecule

toMolecules :: SelectMolecule -> Base.SelectMolecule
toMolecules (SelectMolecule payload) = payload
