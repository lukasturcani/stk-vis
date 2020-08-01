module Requests.Molecule
    ( module Exports
    , keys
    , properties
    , toValidated
    , fromEntry
    ) where

import Mongo as Mongo
import Data.Maybe (Maybe)
import ValidatedMolecule as Validated

import Requests.Molecule.Internal.Data
    ( Molecule
    , Keys
    , Properties
    ) as Exports

import Requests.Molecule.Internal.Data
    ( keys
    , properties
    , toValidated
    ) as Data

import Requests.Molecule.Internal.FromEntry
    ( fromEntry
    ) as  FromEntry

keys :: Exports.Molecule -> Exports.Keys
keys = Data.keys

properties :: Exports.Molecule -> Exports.Properties
properties = Data.properties

toValidated :: Exports.Molecule -> Validated.Molecule
toValidated = Data.toValidated

fromEntry :: Mongo.Entry -> Maybe Exports.Molecule
fromEntry = FromEntry.fromEntry
