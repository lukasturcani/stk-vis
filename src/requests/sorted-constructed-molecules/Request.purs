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
import Requests.SortedCollection as SortedCollection

import Requests.Molecule
    ( Molecule
    , fromEntry
    ) as Molecule

import Requests.Molecule.Utils
    ( toMap
    ) as Molecule

import Requests.PositionMatrix
    ( fromEntry
    ) as Matrix

import Requests.PositionMatrix.Utils
    ( toMap
    ) as Matrix

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
type CollectionName = String

foreign import query
    :: MoleculeKeyName
    -> CollectionName
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
                options.constructedMoleculeCollection
                (isAscending options.sortType)
            )

    let
        sortedCollection = SortedCollection.fromEntries
            options.sortedCollection
            options.moleculeKey
            (Array.slice 0 options.numEntriesPerPage sortedEntries)

        dataQuery = Utils.dataQuery
            options.moleculeKey
            (SortedCollection.keys sortedCollection)

    rawMoleculeEntries <-
        Mongo.toArray $ Mongo.find
            database
            options.moleculeCollection
            dataQuery

    matrixEntries <-
        Mongo.toArray $ Mongo.find
            database
            options.positionMatrixCollection
            dataQuery

    let
        baseMolecules =
            Molecule.toMap <<< Array.concat <<<
            map (
                Maybe.toArray <<<
                    Molecule.fromEntry options.moleculeKey
            ) $
            rawMoleculeEntries

        matrices =
            Matrix.toMap <<< Array.concat <<<
            map (
                Maybe.toArray <<< Matrix.fromEntry options.moleculeKey
            ) $
            matrixEntries

        positioned = Utils.addPositionMatrices baseMolecules matrices

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

        molecules =
            Molecule.toMap
                (Utils.addValues positioned collections)

        sortedMolecules =
            sortedCollection `SortedCollection.addMolecules` molecules

    collection <- collectionPromise sortedMolecules

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

collectionPromise
    :: Deferred
    => Array Molecule.Molecule
    -> Promise (SelectingCollection Molecule.Molecule)

collectionPromise molecules = case Array.uncons molecules of
    Just { head: x, tail: xs } -> pure $ selectingCollection [] x xs
    Nothing -> reject $ error "No valid molecules were found."
