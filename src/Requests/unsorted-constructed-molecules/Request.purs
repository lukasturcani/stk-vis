module Requests.UnsortedConstructedMolecules.Internal.Request
    ( request
    , RequestOptions
    ) where

import Prelude
import Mongo as Mongo
import Data.Array as Array
import Effect.Exception (error)
import Effect.Promise (class Deferred, Promise, all, reject)
import Data.Set (fromFoldable, insert, member)
import Data.Maybe (Maybe (Nothing, Just))
import Data.Maybe.Utils as Maybe
import SelectingCollection (SelectingCollection, selectingCollection)
import Requests.Utils as Utils
import Requests.PageKind (pageKind)
import Requests.Collection as Collection
import Requests.MoleculeKey (MoleculeKeyName)
import Requests.MoleculeEntry as MoleculeEntry
import Requests.Molecule as Molecule

import Requests.UnsortedConstructedMolecules.Internal.Result
    ( Result (..)
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
    , pageIndex                             :: Int
    , numEntriesPerPage                     :: Int
    , ignoredCollections                    :: Array String
    }

type ConstructedMoleculeCollectionName = String
type PositionMatrixCollectionName = String

foreign import query
    :: MoleculeKeyName
    -> ConstructedMoleculeCollectionName
    -> PositionMatrixCollectionName
    -> Mongo.AggregationQuery

request :: Deferred => RequestOptions -> Promise Result

request options = do

    let
        nonValueCollections =
            insert options.moleculeCollection $
            insert options.constructedMoleculeCollection $
            insert options.positionMatrixCollection $
            fromFoldable options.ignoredCollections

    client <- Mongo.client options.url
    let database = Mongo.database client options.database
    collectionNames <- Mongo.collections database

    let
        valueCollections =
            Array.filter
            (not <<< flip member nonValueCollections)
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

    collection <- _collectionPromise molecules

    pure
        (Result
            { pageKind: pageKind
                (Array.length rawMoleculeEntries)
                options.pageIndex
                options.numEntriesPerPage
            , valueCollections
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
    :: MoleculeKeyName
    -> UnvalidatedMoleculeQueryEntry
    -> Maybe Molecule.Molecule

_maybeGetMolecule moleculeKey entry =
    MoleculeEntry.fromMoleculeQueryEntry moleculeKey entry >>=
    Molecule.fromMoleculeEntry
