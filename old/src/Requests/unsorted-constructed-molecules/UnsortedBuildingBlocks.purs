module Requests.UnsortedConstructedMolecules
    ( request
    , module Exports
    ) where

import Effect.Promise (class Deferred, Promise)

import Requests.UnsortedConstructedMolecules.Internal.Request
    ( RequestOptions
    ) as Exports

import Requests.UnsortedConstructedMolecules.Internal.Result
    ( Result (..)
    ) as Exports

import Requests.UnsortedConstructedMolecules.Internal.Request
    ( request
    ) as Request

request :: Deferred => Exports.RequestOptions -> Promise Exports.Result
request = Request.request
