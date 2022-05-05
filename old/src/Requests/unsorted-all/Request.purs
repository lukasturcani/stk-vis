module Requests.UnsortedAll.Internal.Request
    ( request
    , RequestOptions
    ) where

import Prelude
import Mongo as Mongo
import Data.Array as Array
import Requests.UnsortedAll.Internal.Result (Result (..))
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
import Requests.MoleculeEntry as MoleculeEntry
import Requests.Molecule as Molecule

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
    , pageIndex                             :: Int
    , numEntriesPerPage                     :: Int
    , ignoredCollections                    :: HashSet String
    }

type ConstructedMoleculeCollectionName = String
type PositionMatrixCollectionName = String
type BuildingBlockPositionMatrixCollectionName = String

foreign import query
    :: MoleculeKeyName
    -> ConstructedMoleculeCollectionName
    -> PositionMatrixCollectionName
    -> BuildingBlockPositionMatrixCollectionName
    -> Mongo.AggregationQuery

request :: Deferred => RequestOptions -> Promise Result

request options = do

    let
        nonValueCollections =
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

    rawMoleculeEntries <-
        Mongo.toArray $
        Mongo.limit (options.numEntriesPerPage+1) $
        Mongo.skip (options.pageIndex * options.numEntriesPerPage) $
        Mongo.aggregate
            database
            options.moleculeCollection
            (query
                options.moleculeKey
                options.constructedMoleculeCollection
                options.positionMatrixCollection
                options.buildingBlockPositionMatrixCollection
            )

    let
        maybeGetMolecule =
            Maybe.toArray <<< _maybeGetMolecule options.moleculeKey

        baseMolecules =
            Array.concatMap maybeGetMolecule $
            Array.slice 0 options.numEntriesPerPage rawMoleculeEntries

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

    collection <- collectionPromise molecules

    pure
        (Result
            { pageKind: pageKind
                (Array.length rawMoleculeEntries)
                options.pageIndex
                options.numEntriesPerPage
            , valueCollections: HashSet.fromArray valueCollections
            , molecules: collection
            }
        )

collectionPromise
    :: Deferred
    => Array Molecule.Molecule
    -> Promise (SelectingCollection Molecule.Molecule)

collectionPromise molecules = case Array.uncons molecules of
    Just { head: x, tail: xs } -> pure $ selectingCollection [] x xs
    Nothing -> reject $ error "No valid molecules were found."

_maybeGetMolecule
    :: MoleculeKeyName
    -> UnvalidatedMoleculeQueryEntry
    -> Maybe Molecule.Molecule

_maybeGetMolecule moleculeKey entry =
    MoleculeEntry.fromMoleculeQueryEntry moleculeKey entry >>=
    Molecule.fromMoleculeEntry
