module Requests.BuildingBlocks.Internal.Request
    ( RequestOptions
    , request
    )

import Effect.Promise (class Deferred, Promise)

import Requests.BuildingBlocks.Internal.Result
    ( Result (Result)
    )

type RequestOptions =
    {
    }

request :: Deferred => RequestOptions -> Promise Result
request options = do

