module Requests.Molecule.Internal.Data
    ( Molecule (..)
    , Properties
    , key
    , properties
    , constructed
    , toValidated
    , fromValidated
    ) where

import Data.Map (Map)
import ValidatedMolecule as Validated
import Requests.MoleculeKey (MoleculeKeyValue)

type Properties = Map String String

data Molecule = Molecule
    { _key         :: MoleculeKeyValue
    , _properties  :: Properties
    , _molecule    :: Validated.Molecule
    , _constructed :: Boolean
    }

key :: Molecule -> MoleculeKeyValue
key (Molecule { _key }) = _key

properties :: Molecule -> Map String String
properties (Molecule { _properties }) = _properties

constructed :: Molecule -> Boolean
constructed (Molecule { _constructed }) = _constructed

toValidated :: Molecule -> Validated.Molecule
toValidated (Molecule { _molecule }) = _molecule

fromValidated
    :: Boolean
    -> MoleculeKeyValue
    -> Properties
    -> Validated.Molecule
    -> Molecule

fromValidated constructed' key' props mol = Molecule
    { _key: key'
    , _properties: props
    , _molecule: mol
    , _constructed: constructed'
    }
