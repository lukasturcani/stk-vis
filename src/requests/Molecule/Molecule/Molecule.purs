module Requests.Molecule
    ( module Exports
    , key
    , properties
    , toValidated
    , fromEntry
    ) where

import Mongo as Mongo
import Data.Maybe (Maybe)
import ValidatedMolecule as Validated

import Requests.Molecule.Internal.Data
    ( Molecule
    , Properties
    ) as Exports

import Requests.MoleculeKey (MoleculeKeyName, MoleculeKeyValue)

import Requests.Molecule.Internal.Data
    ( key
    , properties
    , toValidated
    ) as Data

import Requests.Molecule.Internal.FromEntry
    ( fromEntry
    ) as  FromEntry

key :: Exports.Molecule -> MoleculeKeyValue
key = Data.key

properties :: Exports.Molecule -> Exports.Properties
properties = Data.properties

toValidated :: Exports.Molecule -> Validated.Molecule
toValidated = Data.toValidated

fromEntry :: MoleculeKeyName -> Mongo.Entry -> Maybe Exports.Molecule
fromEntry = FromEntry.fromEntry
