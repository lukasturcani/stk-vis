module Requests.UnsortedBuildingBlocks
    ( request
    , module Exports
    ) where

import Effect.Promise (class Deferred, Promise)

import Requests.UnsortedBuildingBlocks.Internal.Request
    ( RequestOptions
    ) as Exports

import Requests.UnsortedBuildingBlocks.Internal.Result
    ( Result (..)
    ) as Exports

import Requests.UnsortedBuildingBlocks.Internal.Request
    ( request
    ) as Request

request :: Deferred => Exports.RequestOptions -> Promise Exports.Result
request = Request.request
