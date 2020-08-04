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
import Data.Set (fromFoldable, insert, member)
import Data.Map (keys)
import Data.Maybe (Maybe (Nothing, Just))
import Data.Maybe.Utils as Maybe
import SelectingCollection (SelectingCollection, selectingCollection)
import Requests.Utils as Utils
import Requests.PageKind (pageKind)
import Requests.Collection as Collection
import Requests.MoleculeKey (MoleculeKeyName)
import Requests.SortType (SortType, isAscending)

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
    , positionMatrixCollection              :: String
    , buildingBlockPositionMatrixCollection :: String
    , pageIndex                             :: Int
    , numEntriesPerPage                     :: Int
    , ignoredCollections                    :: Array String
    , sortedCollection                      :: String
    , sortType                              :: SortType
    }

type IsAscending = Boolean;

foreign import query
    :: MoleculeKeyName -> IsAscending -> Mongo.AggregationQuery

request :: Deferred => RequestOptions -> Promise Result

request options = do

    let
        nonValueCollections =
            insert options.moleculeCollection $
            insert options.positionMatrixCollection $
            insert options.buildingBlockPositionMatrixCollection $
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
            (query options.moleculeKey (isAscending options.sortType))

    let
        sortedCollection = SortedCollection.fromEntries
            options.moleculeKey $
            Array.slice 0 options.numEntriesPerPage sortedEntries

        dataQuery = Utils.dataQuery
            options.moleculeKey
            (SortedCollection.keys sortedCollection)

    rawMoleculeEntries <-
        Mongo.toArray $ Mongo.find
            database
            options.moleculeCollection
            dataQuery

    matrixEntries1 <-
        Mongo.toArray $ Mongo.find
            database
            options.positionMatrixCollection
            dataQuery

    matrixEntries2 <-
        Mongo.toArray $ Mongo.find
            database
            options.buildingBlockPositionMatrixCollection
            dataQuery

    let
        baseMolecules =
            Molecule.toMap <<< Array.concat <<<
            map (
                Maybe.toArray <<<
                    Molecule.fromEntry options.moleculeKey
            )
            rawMoleculeEntries

        matrices =
            Matrix.toMap <<< Array.concat <<<
            map (
                Maybe.toArray <<< Matrix.fromEntry options.moleculeKey
            ) $
            (Array.concat [matrixEntries1, matrixEntries2])

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

        molecules = Utils.addValues positioned collections

    collection <- collectionPromise molecules

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

collectionPromise
    :: Deferred
    => Array Molecule.Molecule
    -> Promise (SelectingCollection Molecule.Molecule)

collectionPromise molecules = case Array.uncons molecules of
    Just { head: x, tail: xs } -> pure $ selectingCollection [] x xs
    Nothing -> reject $ error "No valid molecules were found."
