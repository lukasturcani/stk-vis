module Molecules.Utils
    ( molecule
    ) where

import Prelude
import Partial.Unsafe (unsafePartial)
import Molecules.Molecule as Molecule
import Data.Map (fromFoldable)
import Data.Tuple (Tuple (Tuple))
import Data.Maybe (fromJust)
import ValidatedMolecule as Validated
import ValidatedMolecule.Position as Position

import ValidatedMolecule.ChemicalSymbol
    ( ChemicalSymbol (..)
    ) as ChemicalSymbol

molecule :: Molecule.Molecule
molecule = Molecule.molecule
    false
    validated
    (fromFoldable
        [ Tuple "one"   "1"
        , Tuple "two"   "2"
        , Tuple "three" "3"
        , Tuple "four"  "4"
        ]
    )
  where
    validated :: Validated.Molecule
    validated = unsafePartial (fromJust maybeMolecule)
    maybeMolecule = Validated.molecule
        [ Validated.atom
            ChemicalSymbol.C (Position.position 0.0 0.0 0.0)
        , Validated.atom
            ChemicalSymbol.H (Position.position 1.0 0.0 0.0)
        , Validated.atom
            ChemicalSymbol.H (Position.position (-1.0) 0.0 0.0)
        ]
        [ Validated.bond 1 0 1
        , Validated.bond 1 0 2
        ]

