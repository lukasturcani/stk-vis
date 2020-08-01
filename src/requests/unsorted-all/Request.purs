module Requests.UnsortedAll.Internal.Request
    ( request
    , RequestOptions
    ) where

import Prelude
import Mongo as Mongo
import Data.Array as Array
import Requests.UnsortedAll.Internal.Result (Result (..))
import Effect.Promise (class Deferred, Promise, all)
import Data.Set (Set, fromFoldable, insert, member)
import Data.Map (keys)
import SelectingCollection (selectingCollection)
import Requests.Molecule as Molecule
import Requests.Molecule.Utils as Molecule
import Requests.Utils (maybeToArray)
import Requests.PageKind (pageKind)
import Requests.PositionMatrix as Matrix
import Requests.PositionMatrix.Utils as Matrix

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
            map (maybeToArray <<< Molecule.fromEntry) $
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
            map (maybeToArray <<< Matrix.fromEntry)
            (Array.concat [matrixEntries1, matrixEntries2])

    --values <-
    --    all $ map (Mongo.find' database dataQuery) valueCollections

    --let collections =
    --    Utils.toCollection <$> values <*> valueCollections

    -- molecules molecules matrices


    pure
        (Result
            { pageKind: pageKind
                (Array.length moleculeEntries)
                options.pageIndex
                options.numEntriesPerPage
            , valueCollections
            , molecules: selectingCollection [] first rest
            }
        )
