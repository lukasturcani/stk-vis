module Molecules.Molecule
    ( Molecule
    , properties
    , molecule
    ) where

data Molecule = Molecule
    { _properties :: Map String String
    }

properties :: Molecule -> Map String String
properties (Molecule { _properties }) = _properties

molecule :: Map String String -> Molecule
molecule = Molecule
