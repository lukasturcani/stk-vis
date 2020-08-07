module RequestManager.RequestManager.Internal.RequestManager
    ( RequestManager (..)
    , valueCollections
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

valueCollections :: RequestManager -> Array String

valueCollections (UnsortedAll manager)
    = UnsortedAll.valueCollections manager

valueCollections (UnsortedBuildingBlocks manager)
    = UnsortedBBs.valueCollections manager

valueCollections (UnsortedConstructedMolecules manager)
    = UnsortedCMs.valueCollections manager

valueCollections (SortedAll manager)
    = SortedAll.valueCollections manager

valueCollections (SortedBuildingBlocks manager)
    = SortedBBs.valueCollections manager

valueCollections (SortedConstructedMolecules manager)
    = SortedCMs.valueCollections manager
