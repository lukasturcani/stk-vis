module Requests.UnsortedAll
    ( request
    , module Exports
    ) where

import Effect.Promise (class Deferred, Promise)

import Requests.UnsortedAll.Internal.Request
    ( RequestOptions
    ) as Exports

import Requests.UnsortedAll.Internal.Result
    ( Result (..)
    ) as Exports

import Requests.UnsortedAll.Internal.Request
    ( request
    ) as Request

request :: Deferred => Exports.RequestOptions -> Promise Exports.Result
request = Request.request
