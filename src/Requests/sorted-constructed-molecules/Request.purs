module Requests.SortedConstructedMolecules.Internal.Request
    ( request
    , RequestOptions
    ) where

import Prelude
import Mongo as Mongo
import Data.Array as Array
import Requests.SortedConstructedMolecules.Internal.Result (Result (..))
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
    , pageIndex                             :: Int
    , numEntriesPerPage                     :: Int
    , ignoredCollections                    :: Array String
    , sortedCollection                      :: String
    , sortType                              :: SortType
    }

type IsAscending = Boolean
type MoleculeCollectionName = String
type ConstructedMoleculeCollectionName = String
type PositionMatrixCollectionName = String
type CollectionName = String

foreign import query
    :: MoleculeKeyName
    -> MoleculeCollectionName
    -> ConstructedMoleculeCollectionName
    -> PositionMatrixCollectionName
    -> IsAscending
    -> Mongo.AggregationQuery

request :: Deferred => RequestOptions -> Promise Result

request options = do

    let
        nonValueCollections =
            insert options.sortedCollection $
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
            , valueCollections: Array.concat
                [[options.sortedCollection], valueCollections]
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
