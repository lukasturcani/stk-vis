module Requests.BuildingBlocks.Internal.Request
    ( RequestOptions
    , request
    ) where

import Prelude
import Effect.Promise (class Deferred, Promise, all, reject)
import Data.Array as Array
import Data.HashSet (HashSet)
import Mongo as Mongo
import Data.Maybe (Maybe (Nothing, Just))
import Data.Maybe.Utils as Maybe
import SelectingCollection (SelectingCollection, selectingCollection)
import Requests.MoleculeKey (MoleculeKeyName, MoleculeKeyValue)
import Requests.Collection as Collection
import Requests.Utils as Utils
import Effect.Exception (error)
import Requests.Molecule as Molecule

import Requests.MoleculeEntry as MoleculeEntry

import Requests.BuildingBlocks.Internal.Result
    ( Result (Result)
    )

import Requests.UnvalidatedMoleculeQueryEntry
    ( UnvalidatedMoleculeQueryEntry
    )

type RequestOptions =
    { url                                   :: String
    , database                              :: String
    , moleculeKey                           :: String
    , moleculeCollection                    :: String
    , constructedMoleculeCollection         :: String
    , positionMatrixCollection              :: String
    , buildingBlockPositionMatrixCollection :: String
    , valueCollections                      :: HashSet String
    , molecule                              :: String
    }

type ConstructedMoleculeCollectionName = String
type PositionMatrixCollectionName = String
type BuildingBlockPositionMatrixCollectionName = String

data UnvalidatedConstructedMoleculeQueryEntry

foreign import _moleculeQuery
    :: MoleculeKeyName
    -> MoleculeKeyValue
    -> Mongo.Query

foreign import _buildingBlockQuery
    :: MoleculeKeyName
    -> ConstructedMoleculeCollectionName
    -> PositionMatrixCollectionName
    -> BuildingBlockPositionMatrixCollectionName
    -> Array MoleculeKeyValue
    -> Mongo.AggregationQuery

foreign import _buildingBlockKeys
    :: MoleculeKeyName
    -> UnvalidatedConstructedMoleculeQueryEntry
    -> Array MoleculeKeyValue

request :: Deferred => RequestOptions -> Promise Result
request options = do
    client <-  Mongo.client options.url
    let database = Mongo.database client options.database

    rawMolecule <- Mongo.findOne
        database
        options.constructedMoleculeCollection
        (_moleculeQuery options.moleculeKey options.molecule)

    rawMoleculeEntries <-
        Mongo.toArray $
        Mongo.aggregate
            database
            options.moleculeCollection
            (_buildingBlockQuery
                options.moleculeKey
                options.constructedMoleculeCollection
                options.positionMatrixCollection
                options.buildingBlockPositionMatrixCollection
                (Array.concatMap
                    (_buildingBlockKeys options.moleculeKey)
                    rawMolecule
                )
            )
    let

        valueCollections = Array.fromFoldable options.valueCollections

        maybeGetMolecule =
            Maybe.toArray <<< _maybeGetMolecule options.moleculeKey

        baseMolecules =
            Array.concatMap maybeGetMolecule rawMoleculeEntries

        baseMoleculeKeys = map Molecule.key baseMolecules

        dataQuery =
            Utils.dataQuery options.moleculeKey baseMoleculeKeys

    values <-
        all $ map
            (Mongo.toArray <<< Mongo.find' database dataQuery)
            valueCollections

    let
        collections =
            Array.zipWith
                (Collection.fromEntries options.moleculeKey)
                valueCollections
                values

        molecules = Utils.addValues baseMolecules collections

    collection <- _collectionPromise molecules

    pure (Result { molecules: collection })

_collectionPromise
    :: Deferred
    => Array Molecule.Molecule
    -> Promise (SelectingCollection Molecule.Molecule)

_collectionPromise molecules = case Array.uncons molecules of
    Just { head: x, tail: xs } -> pure $ selectingCollection [] x xs
    Nothing -> reject $ error "No valid molecules were found."

_maybeGetMolecule
    :: MoleculeKeyName
    -> UnvalidatedMoleculeQueryEntry
    -> Maybe Molecule.Molecule

_maybeGetMolecule moleculeKey entry =
    MoleculeEntry.fromMoleculeQueryEntry moleculeKey entry >>=
    Molecule.fromMoleculeEntry
