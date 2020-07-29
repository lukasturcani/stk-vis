module Requests.Utils
    ( toMolecule
    ) where

import Data.Maybe (Maybe)
import ValidatedMolecule as Validated
import Requests.Molecule (Molecule)
import Mongo as Mongo

type MoleculeEntry =
    {
    }

foreign import toMoleculeEntry :: Mongo.Entry -> Maybe MoleculeEntry

foreign import toMoleculeImpl
    :: toMoleculeImplHelpers -> Mongo.Entry -> Maybe Validated.Molecule

toMolecule :: Mong.Entry -> Array Molecule
toMolecule = toMoleculeImpl
    {
    }

foreign import dataQuery :: Array Molecule -> Mongo.Query
