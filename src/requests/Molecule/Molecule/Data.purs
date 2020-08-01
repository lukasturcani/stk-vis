module Requests.Molecule.Internal.Data
    ( Molecule (..)
    , Keys
    , Properties
    , key
    , properties
    , toValidated
    ) where

import Data.Map (Map)
import ValidatedMolecule as Validated
import Requests.Molecule.Internal.MoleculeKey (MoleculeKeyValue)

type Properties = Map String String

data Molecule = Molecule
    { _key        :: MoleculeKeyValue
    , _properties :: Properties
    , _molecule   :: Validated.Molecule
    }

key :: Molecule -> MoleculeKeyValue
key (Molecule { _key }) = _key

properties :: Molecule -> Map String String
properties (Molecule { _properties }) = _properties

toValidated :: Molecule -> Validated.Molecule
toValidated (Molecule { _molecule }) = _molecule
