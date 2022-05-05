module Requests.SortedBuildingBlocks
    ( request
    , module Exports
    ) where

import Effect.Promise (class Deferred, Promise)

import Requests.SortedBuildingBlocks.Internal.Request
    ( RequestOptions
    ) as Exports

import Requests.SortedBuildingBlocks.Internal.Result
    ( Result (..)
    ) as Exports

import Requests.SortedBuildingBlocks.Internal.Request
    ( request
    ) as Request

request :: Deferred => Exports.RequestOptions -> Promise Exports.Result
request = Request.request
