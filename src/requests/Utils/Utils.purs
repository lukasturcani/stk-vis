module Requests.Utils
    ( toMolecule
    ) where

import Data.Map (Map, empty, insert)
import Data.Maybe (Maybe (Nothing, Just))
import ValidatedMolecule as Validated
import Requests.Molecule (Molecule)
import Mongo as Mongo


toMolecule :: Mongo.Entry -> Maybe
toMolecule entry = do
    entry <- toMoleculeEntry entry
    Validated.molecule (map atom entry.atoms) (map bond entry.bond)
    pure

foreign import toMoleculeImpl
    :: toMoleculeImplHelpers -> Mongo.Entry -> Maybe Validated.Molecule

toMolecule :: Mong.Entry -> Array Molecule
toMolecule = toMoleculeImpl
    {
    }

foreign import dataQuery :: Array Molecule -> Mongo.Query
