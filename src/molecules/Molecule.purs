module Molecules.Molecule
    ( Molecule
    , properties
    , molecule
    ) where

import Data.Map (Map)

data Molecule = Molecule
    { _properties :: Map String String
    }

properties :: Molecule -> Map String String
properties (Molecule { _properties }) = _properties

molecule :: Map String String -> Molecule
molecule properties' = Molecule { _properties: properties' }
