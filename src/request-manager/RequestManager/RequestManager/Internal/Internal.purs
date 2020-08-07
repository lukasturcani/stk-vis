module RequestManager.RequestManager.Internal.RequestManager
    ( RequestManager (..)
    ) where

import RequestManager.RequestManager.Internal.RequestManager.SortedAll
    as SortedAll

import RequestManager.RequestManager.Internal.RequestManager.SortedBuildingBlocks
    as SortedBBs

import RequestManager.RequestManager.Internal.RequestManager.SortedConstructedMolecules
    as SortedCMs

import RequestManager.RequestManager.Internal.RequestManager.UnsortedAll
    as UnsortedAll

import RequestManager.RequestManager.Internal.RequestManager.UnsortedBuildingBlocks
    as UnsortedBBs

import RequestManager.RequestManager.Internal.RequestManager.UnsortedConstructedMolecules
    as UnsortedCMs

data RequestManager
    = UnsortedAll UnsortedAll.UnsortedAll
    | UnsortedBuildingBlocks UnsortedBBs.UnsortedBuildingBlocks
    | UnsortedConstructedMolecules
        UnsortedCMs.UnsortedConstructedMolecules
    | SortedAll SortedAll.SortedAll
    | SortedBuildingBlocks SortedBBs.SortedBuildingBlocks
    | SortedConstructedMolecules SortedCMs.SortedConstructedMolecules
