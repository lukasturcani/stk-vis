module RequestManager.RequestManager.Internal.RequestManager
    ( RequestManager (..)
    , _pageKind
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

import RequestManager.PageKind (PageKind)

data RequestManager
    = UnsortedAll UnsortedAll.UnsortedAll
    | UnsortedBuildingBlocks UnsortedBBs.UnsortedBuildingBlocks
    | UnsortedConstructedMolecules
        UnsortedCMs.UnsortedConstructedMolecules
    | SortedAll SortedAll.SortedAll
    | SortedBuildingBlocks SortedBBs.SortedBuildingBlocks
    | SortedConstructedMolecules SortedCMs.SortedConstructedMolecules


_pageKind :: RequestManager -> PageKind

_pageKind (UnsortedAll manager)
    = UnsortedAll._pageKind manager

_pageKind (UnsortedBuildingBlocks manager)
    = UnsortedBBs._pageKind manager

_pageKind (UnsortedConstructedMolecules manager)
    = UnsortedCMs._pageKind manager

_pageKind (SortedAll manager)
    = SortedAll._pageKind manager

_pageKind (SortedBuildingBlocks manager)
    = SortedBBs._pageKind manager

_pageKind (SortedConstructedMolecules manager)
    = SortedCMs._pageKind manager
