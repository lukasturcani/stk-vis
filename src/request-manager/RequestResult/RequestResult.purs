module RequestManager.RequestResult
    ( RequestResult (..)
    ) where

import Requests.UnsortedAll as UnsortedAll

data RequestResult
    = UnsortedAll UnsortedAll.Result
