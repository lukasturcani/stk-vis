module Requests.UnsortedAll.Internal.Request
    ( request
    ) where

import Prelude
import Mongo as Mongo
import Data.Array (slice)
import Requests.UnsortedAll.Internal.Result (Result (..))
import Effect.Promise (Promise)
import Data.Set (Set, fromFoldable, insert, member)

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

    let nonValueCollections
        = insert options.moleculeCollection
        $ insert options.positionMatrixCollection
        $ insert options.buildingBlockPositionMatrixCollection
        fromFoldable options.ignoredCollections

    client <- Mongo.client options.url
    database <- Mongo.database client options.database
    collections <- Mongo.collections database

    let valueCollections
        = filter (not <<< flip member nonValueCollections) collections

    moleculeEntries
        <- Mongo.find database options.moleculeCollection query

    let molecules
        = Utils.toMolecules
        $ slice 0 options.numEntriesPerPage moleculeEntries

    let dataQuery = Utils.dataQuery molecules

    matrixEntries1
        <- find database options.positionMatrixCollection dataQuery

    matrixEntries2
        <- find
            database
            options.buildingBlockPositionMatrixCollection
            dataQuery



    pure
        (Result
            { pageKind: pageKind
                (length moleculeEntries)
                options.pageIndex
                options.numEntriesPerPage
            }
        )
