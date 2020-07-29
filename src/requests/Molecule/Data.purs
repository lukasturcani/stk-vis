module Requests.Molecule.Internal.Data
    ( Molecule (..)
    , Keys
    , Properties
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
