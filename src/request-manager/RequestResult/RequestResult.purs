module RequestManager.RequestResult
    ( RequestResult (..)
    ) where

import Requests.UnsortedAll as UnsortedAll
import Requests.UnsortedBuildingBlocks as UnsortedBuildingBlocks

data RequestResult
    = UnsortedAll UnsortedAll.Result
    | UnsortedBuildingBlocks UnsortedBuildingBlocks.Result
