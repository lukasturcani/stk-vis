module Requests.Molecule
    ( Molecule
    , keys
    , properties
    , molecule
    , toValidated
    ) where

import Data.Map (Map)
import ValidatedMolecule as Validated

type Keys = Map String String
type Properties = Map String String

data Molecule = Molecule
    { _keys       :: Keys
    , _properties :: Properties
    , _molecule   :: Validated.Molecule
    }

keys :: Molecule -> Map String String
keys (Molecule { _keys }) = _keys

properties :: Molecule -> Map String String
properties (Molecule { _properties }) = _properties

toValidated :: Molecule -> Validated.Molecule
toValidated (Molecule { _molecule }) = _molecule

molecule :: Validated.Molecule -> Keys -> Properties -> Molecule
molecule mol keys' props = Molecule
    { _keys: keys'
    , _molecule: mol
    , _properties: props
    }
