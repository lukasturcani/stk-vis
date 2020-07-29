module Requests.Molecule.Internal.FromEntry
    ( fromEntry
    ) where

import Mongo as Mongo
import Data.Maybe (Maybe)
import Requests.Molecule.Internal.Data (Molecule)

fromEntry :: Mongo.Entry -> Maybe Molecule
toMolecule entry = do
    entry <- toMoleculeEntry entry
    validated <- Validated.molecule (map atom entry.atoms) (map bond entry.bond)
    pure $ molecule validated empty empty

atom :: AtomEntry -> Maybe Validated.Atom
atom ({ atomicNumber }) = Validated.atom(

