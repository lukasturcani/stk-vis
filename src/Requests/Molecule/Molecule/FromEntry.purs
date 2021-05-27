module Requests.Molecule.Internal.FromEntry
    ( fromEntry
    ) where

import Prelude
import Mongo as Mongo
import Data.Maybe (Maybe)
import Data.Maybe.Utils (addWith)
import Data.Foldable (foldM)
import Data.List (List (Nil))
import Data.Map (empty)
import Data.Array (fromFoldable)
import ValidatedMolecule.ChemicalSymbol (chemicalSymbol) as Validated
import Requests.Molecule.Internal.Data (Molecule (Molecule))
import Requests.Molecule.Internal.ToMoleculeEntry (toMoleculeEntry)

import ValidatedMolecule
    ( Bond
    , Atom
    , atom
    , bond
    , molecule
    ) as Validated

import Requests.Molecule.Internal.MoleculeEntry
    ( AtomEntry
    , BondEntry
    )

import Requests.MoleculeKey (MoleculeKeyName)

fromEntry :: MoleculeKeyName -> Mongo.Entry -> Maybe Molecule
fromEntry moleculeKey entry = do
    moleculeEntry <- toMoleculeEntry moleculeKey entry
    atoms <- foldM (addWith atom) Nil moleculeEntry.atoms
    validated <-
        Validated.molecule
        (fromFoldable atoms)
        (map bond moleculeEntry.bonds)

    pure $ Molecule
        { _key: moleculeEntry.key
        , _properties: empty
        , _molecule: validated
        , _constructed: moleculeEntry.constructed
        }

atom :: AtomEntry -> Maybe Validated.Atom
atom ({ atomicNumber, position }) = do
    chemicalSymbol <- Validated.chemicalSymbol atomicNumber
    pure $ Validated.atom chemicalSymbol position

bond :: BondEntry -> Validated.Bond
bond ({ order, atom1Id, atom2Id })
    = Validated.bond
        -- Assume bond order 9 is dative bonds, therefore force them
        -- to render as single bonds.
        (if order == 9 then 1 else order)
        atom1Id
        atom2Id
