module RequestManager.RequestManager.Internal.RequestManager
    ( RequestManager (..)
    ) where

import RequestManager.RequestManager.Internal.RequestManager.SortedAll
    ( SortedAll
    )

import RequestManager.RequestManager.Internal.RequestManager.SortedBuildingBlocks
    ( SortedBuildingBlocks
    )

import RequestManager.RequestManager.Internal.RequestManager.SortedConstructedMolecules
    ( SortedConstructedMolecules
    )

import RequestManager.RequestManager.Internal.RequestManager.UnsortedAll
    ( UnsortedAll
    )

import RequestManager.RequestManager.Internal.RequestManager.UnsortedBuildingBlocks
    ( UnsortedBuildingBlocks
    )

import RequestManager.RequestManager.Internal.RequestManager.UnsortedConstructedMolecules
    ( UnsortedConstructedMolecules
    )

data RequestManager
    = UnsortedAll UnsortedAll
    | UnsortedBuildingBlocks UnsortedBuildingBlocks
    | UnsortedConstructedMolecules UnsortedConstructedMolecules
    | SortedAll SortedAll
    | SortedBuildingBlocks SortedBuildingBlocks
    | SortedConstructedMolecules SortedConstructedMolecules
