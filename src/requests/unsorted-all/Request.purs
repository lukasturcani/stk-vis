module Requests.UnsortedAll.Internal.Request
    ( request
    ) where

import Requests.UnsortedAll.Internal.Result (Result (..))
import Effect.Promise (Promise)

type RequestOptions =
    { url :: String
    , database :: String
    , moleculeKey :: String
    , moleculeCollection :: String
    , positionMatrixCollection :: String
    , buildingBlockPositionMatrixCollection :: String
    , pageIndex :: Int
    , numEntriesPerPage :: Int
    , ignoredCollections :: Array String
    }

request :: RequestOptions -> Promise Result
request options = do

