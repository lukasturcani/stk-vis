module RequestManager.RequestResult
    ( RequestResult (..)
    ) where

import Requests.UnsortedAll as UnsortedAll
import Requests.UnsortedBuildingBlocks as UnsortedBuildingBlocks

import Requests.UnsortedConstructedMolecules
    as UnsortedConstructedMolecules

data RequestResult
    = UnsortedAll UnsortedAll.Result
    | UnsortedBuildingBlocks UnsortedBuildingBlocks.Result
    | UnsortedConstructedMolecules UnsortedConstructedMolecules.Result
