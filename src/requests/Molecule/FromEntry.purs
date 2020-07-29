module Requests.Molecule.Internal.FromEntry
    ( fromEntry
    ) where

import Mongo as Mongo
import Data.Maybe (Maybe)
import Requests.Molecule.Internal.Data (Molecule (Molecule))
import Requests.Molecule.Internal.ToMoleculeEntry (toMoleculeEntry)

fromEntry :: Mongo.Entry -> Maybe Molecule
toMolecule entry = do
    entry <- toMoleculeEntry entry
    validated <- Validated.molecule (map atom entry.atoms) (map bond entry.bond)
    pure $ Molecule
        { _keys: empty
        , _properties: empty
        , _molecule: validated
        }

atom :: AtomEntry -> Maybe Validated.Atom
atom ({ atomicNumber }) = Validated.atom(
