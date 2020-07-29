module Requests.Molecule.Internal.FromEntry
    ( fromEntry
    ) where

import Mongo as Mongo
import Data.Maybe (Maybe)
import ValidatedMolecule.ChemicalSymbol (chemicalSymbol) as Validated
import ValidatedMolecule (atom) as Validated
import Requests.Molecule.Internal.Data (Molecule (Molecule))
import Requests.Molecule.Internal.ToMoleculeEntry (toMoleculeEntry)

fromEntry :: Mongo.Entry -> Maybe Molecule
toMolecule entry = do
    entry <- toMoleculeEntry entry
    atoms <- foldM (maybeFold atom) Nil entry.atoms
    validated <- Validated.molecule atoms (map bond entry.bond)
    pure $ Molecule
        { _keys: empty
        , _properties: empty
        , _molecule: validated
        }

atom :: AtomEntry -> Maybe Validated.Atom
atom ({ atomicNumber }) = do
    chemicalSymbol <- Validated.chemicalSymbol atomicNumber
    pure
        $ Validated.atom
            chemicalSymbol
            (Validated.position 0.0 0.0 0.0)

bond :: BondEntry -> ValidatedBond
bond ({ order, atom1Id, atom2Id })
    = Validated.bond order atom1Id atom2Id
