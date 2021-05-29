module Requests.Molecule
    ( module Exports
    , key
    , properties
    , constructed
    , toValidated
    , fromEntry
    , fromValidated
    ) where

import Data.Maybe (Maybe)
import ValidatedMolecule as Validated
import Mongo as Mongo

import Requests.Molecule.Internal.Data
    ( Molecule
    , Properties
    ) as Exports

import Requests.MoleculeKey (MoleculeKeyName, MoleculeKeyValue)
import Requests.MoleculeEntry (MoleculeEntry)

import Requests.Molecule.Internal.Data
    ( key
    , properties
    , toValidated
    , fromValidated
    , fromEntry
    , fromMoleculeEntry
    , constructed
    ) as Data

key :: Exports.Molecule -> MoleculeKeyValue
key = Data.key

properties :: Exports.Molecule -> Exports.Properties
properties = Data.properties

constructed :: Exports.Molecule -> Boolean
constructed = Data.constructed

toValidated :: Exports.Molecule -> Validated.Molecule
toValidated = Data.toValidated

fromEntry :: MoleculeKeyName -> Mongo.Entry -> Maybe Exports.Molecule
fromEntry = Data.fromEntry

fromMoleculeEntry
    :: forall r
    .  MoleculeEntry r
    -> Maybe Exports.Molecule

fromMoleculeEntry = Data.fromMoleculeEntry

fromValidated
    :: Boolean
    -> MoleculeKeyValue
    -> Exports.Properties
    -> Validated.Molecule
    -> Exports.Molecule

fromValidated = Data.fromValidated
