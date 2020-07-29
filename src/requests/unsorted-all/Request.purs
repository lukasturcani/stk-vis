module Requests.UnsortedAll.Internal.Request
    ( request
    , Requestptions
    ) where

import Prelude
import Mongo as Mongo
import Data.Array (slice, concat)
import Requests.UnsortedAll.Internal.Result (Result (..))
import Effect.Promise (Promise, all)
import Data.Set (Set, fromFoldable, insert, member)
import SelectingCollection (selectingCollection)

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

request :: RequestOptions -> Promise Result

request options = do

    let
        nonValueCollections =
            insert options.moleculeCollection $
            insert options.positionMatrixCollection $
            insert options.buildingBlockPositionMatrixCollection $
            fromFoldable options.ignoredCollections

    client <- Mongo.client options.url
    database <- Mongo.database client options.database
    collections <- Mongo.collections database

    let
        valueCollections =
            filter
            (not <<< flip member nonValueCollections)
            collections

    moleculeEntries <-
        Mongo.find database options.moleculeCollection query

    let
        molecules =
            concat <<< map Utils.toMolecule $
            slice 0 options.numEntriesPerPage moleculeEntries

    pure
        (Result
            { pageKind: pageKind
                (length moleculeEntries)
                options.pageIndex
                options.numEntriesPerPage
            , valueCollections
            , molecules: molecules
            }
        )

    -- let dataQuery = Utils.dataQuery molecules

    -- matrixEntries1
    --     <- Mongo.find
    --         database
    --         options.positionMatrixCollection
    --         dataQuery

    -- matrixEntries2
    --     <- Mongo.find
    --         database
    --         options.buildingBlockPositionMatrixCollection
    --         dataQuery

    -- let matrices
    --     = Utils.toMatrices (concat matrixEntries1 matrixEntries2)

    -- values
    --     <- all $ map (Mongo.find' database dataQuery) valueCollections

    -- let collections
    --     = Utils.toCollection <$> values <*> valueCollections

    -- molecules molecules matrices


    -- pure
    --     (Result
    --         { pageKind: pageKind
    --             (length moleculeEntries)
    --             options.pageIndex
    --             options.numEntriesPerPage
    --         , valueCollections
    --         , molecules: selectingCollection [] first rest
    --         }
    --     )
