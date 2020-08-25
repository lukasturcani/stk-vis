module Requests.SortedAll
    ( request
    , module Exports
    ) where

import Effect.Promise (class Deferred, Promise)

import Requests.SortedAll.Internal.Request
    ( RequestOptions
    ) as Exports

import Requests.SortedAll.Internal.Result
    ( Result (..)
    ) as Exports

import Requests.SortedAll.Internal.Request
    ( request
    ) as Request

request :: Deferred => Exports.RequestOptions -> Promise Exports.Result
request = Request.request
