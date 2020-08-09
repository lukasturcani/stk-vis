module StkVis.SelectMolecule
    ( SelectMolecule
    , selectMolecule
    , toMoleculeBrowser
    ) where

import MoleculeBrowser.SelectMolecule as Base

newtype SelectMolecule = SelectMolecule Base.SelectMolecule

selectMolecule :: Base.SelectMolecule -> SelectMolecule
selectMolecule = SelectMolecule

toMoleculeBrowser :: SelectMolecule -> Base.SelectMolecule
toMoleculeBrowser (SelectMolecule payload) = payload
