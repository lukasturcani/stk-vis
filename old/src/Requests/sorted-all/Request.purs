module Requests.SortedAll.Internal.Request
    ( request
    , RequestOptions
    ) where

import Prelude
import Mongo as Mongo
import Data.Array as Array
import Requests.SortedAll.Internal.Result (Result (..))
import Effect.Exception (error)
import Effect.Promise (class Deferred, Promise, all, reject)
import Data.HashSet (HashSet)
import Data.HashSet as HashSet
import Data.Maybe (Maybe (Nothing, Just))
import Data.Maybe.Utils as Maybe
import SelectingCollection (SelectingCollection, selectingCollection)
import Requests.Utils as Utils
import Requests.PageKind (pageKind)
import Requests.Collection as Collection
import Requests.MoleculeKey (MoleculeKeyName)
import Requests.SortType (SortType, isAscending)
import Requests.MoleculeEntry as MoleculeEntry
import Requests.Molecule as Molecule

import Requests.UnvalidatedValueQueryEntry
    ( UnvalidatedValueQueryEntry
    )

type RequestOptions =
    { url                                   :: String
    , database                              :: String
    , moleculeKey                           :: String
    , moleculeCollection                    :: String
    , constructedMoleculeCollection         :: String
    , positionMatrixCollection              :: String
    , buildingBlockPositionMatrixCollection :: String
    , pageIndex                             :: Int
    , numEntriesPerPage                     :: Int
    , ignoredCollections                    :: HashSet String
    , sortedCollection                      :: String
    , sortType                              :: SortType
    }

type CollectionName = String
type IsAscending = Boolean
type MoleculeCollectionName = String
type ConstructedMoleculeCollectionName = String
type PositionMatrixCollectionName = String
type BuildingBlockPositionMatrixCollectionName = String

foreign import query
    :: MoleculeKeyName
    -> MoleculeCollectionName
    -> ConstructedMoleculeCollectionName
    -> PositionMatrixCollectionName
    -> BuildingBlockPositionMatrixCollectionName
    -> IsAscending
    -> Mongo.AggregationQuery

request :: Deferred => RequestOptions -> Promise Result

request options = do

    let
        nonValueCollections =
            HashSet.insert options.sortedCollection $
            HashSet.insert options.moleculeCollection $
            HashSet.insert options.constructedMoleculeCollection $
            HashSet.insert options.positionMatrixCollection $
            HashSet.insert
                options.buildingBlockPositionMatrixCollection $
            options.ignoredCollections

    client <- Mongo.client options.url
    let database = Mongo.database client options.database
    collectionNames <- Mongo.collections database

    let
        valueCollections =
            Array.filter
            (not <<< flip HashSet.member nonValueCollections)
            collectionNames

    sortedEntries <-
        Mongo.toArray $
        Mongo.limit (options.numEntriesPerPage + 1) $
        Mongo.skip (options.pageIndex * options.numEntriesPerPage) $
        Mongo.aggregate
            database
            options.sortedCollection
            (query
                options.moleculeKey
                options.moleculeCollection
                options.constructedMoleculeCollection
                options.positionMatrixCollection
                options.buildingBlockPositionMatrixCollection
                (isAscending options.sortType)
            )

    let
        maybeGetMolecule =
            Maybe.toArray <<<
            _maybeGetMolecule
                options.sortedCollection
                options.moleculeKey

        sortedBaseMolecules =
            Array.concatMap maybeGetMolecule $
            Array.slice 0 options.numEntriesPerPage sortedEntries

        sortedMoleculeKeys = map Molecule.key sortedBaseMolecules

        dataQuery =
            Utils.dataQuery options.moleculeKey sortedMoleculeKeys

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

        molecules = Utils.addValues sortedBaseMolecules collections

    collection <- _collectionPromise molecules

    pure
        (Result
            { pageKind: pageKind
                (Array.length sortedEntries)
                options.pageIndex
                options.numEntriesPerPage
                , valueCollections:
                    HashSet.insert
                        options.sortedCollection
                        (HashSet.fromArray valueCollections)
            , molecules: collection
            }
        )

_collectionPromise
    :: Deferred
    => Array Molecule.Molecule
    -> Promise (SelectingCollection Molecule.Molecule)

_collectionPromise molecules = case Array.uncons molecules of
    Just { head: x, tail: xs } -> pure $ selectingCollection [] x xs
    Nothing -> reject $ error "No valid molecules were found."

_maybeGetMolecule
    :: CollectionName
    -> MoleculeKeyName
    -> UnvalidatedValueQueryEntry
    -> Maybe Molecule.Molecule

_maybeGetMolecule collection moleculeKey entry =
    MoleculeEntry.fromValueQueryEntry collection moleculeKey entry >>=
    Molecule.fromMoleculeEntry
