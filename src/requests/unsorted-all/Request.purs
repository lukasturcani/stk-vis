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
import Data.Set (fromFoldable, insert, member)
import Data.Map (keys)
import Data.Maybe (Maybe (Nothing, Just))
import Data.Maybe.Utils as Maybe
import SelectingCollection (SelectingCollection, selectingCollection)
import Requests.Utils as Utils
import Requests.PageKind (pageKind)

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
    }

foreign import query :: Mongo.Query

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
    collections <- Mongo.collections database

    let
        valueCollections =
            Array.filter
            (not <<< flip member nonValueCollections)
            collections

    rawMoleculeEntries <-
        Mongo.find database options.moleculeCollection query

    let
        molecules =
            Molecule.toMap <<< Array.concat <<<
            map (
                Maybe.toArray <<<
                    Molecule.fromEntry options.moleculeKey
            ) $
            Array.slice 0 options.numEntriesPerPage rawMoleculeEntries

        dataQuery =
            Utils.dataQuery options.moleculeKey
            (Array.fromFoldable <<< keys $ molecules)

    matrixEntries1 <-
        Mongo.find
            database
            options.positionMatrixCollection
            dataQuery

    matrixEntries2 <-
        Mongo.find
            database
            options.buildingBlockPositionMatrixCollection
            dataQuery

    let
        matrices =
            Matrix.toMap <<< Array.concat <<<
            map (
                Maybe.toArray <<< Matrix.fromEntry options.moleculeKey
            ) $
            (Array.concat [matrixEntries1, matrixEntries2])

    --values <-
    --    all $ map (Mongo.find' database dataQuery) valueCollections

    --let collections =
    --    Utils.toCollection <$> values <*> valueCollections

        positioned = Utils.addPositionMatrices molecules matrices

    collection <- collectionPromise positioned

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
