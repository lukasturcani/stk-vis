module Requests.SortedConstructedMolecules
    ( request
    , module Exports
    ) where

import Effect.Promise (class Deferred, Promise)

import Requests.SortedConstructedMolecules.Internal.Request
    ( RequestOptions
    ) as Exports

import Requests.SortedConstructedMolecules.Internal.Result
    ( Result (..)
    ) as Exports

import Requests.SortedConstructedMolecules.Internal.Request
    ( request
    ) as Request

request :: Deferred => Exports.RequestOptions -> Promise Exports.Result
request = Request.request
