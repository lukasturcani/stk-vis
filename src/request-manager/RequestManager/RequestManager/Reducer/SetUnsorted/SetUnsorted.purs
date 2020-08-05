module RequestManager.RequestManager.Internal.Reducer.Internal.SetUnsorted
    ( setUnsorted
    ) where

import RequestManager.RequestManager.Internal.RequestManager
    as RequestManager

import RequestManager.SetUnsorted as SetUnsorted

import RequestManager.RequestManager.Internal.Reducer.Internal.SetUnsorted.Internal.SortedAll
    as SortedAll

import RequestManager.RequestManager.Internal.Reducer.Internal.SetUnsorted.Internal.SortedBuildingBlocks
    as SortedBuildingBlocks

import RequestManager.RequestManager.Internal.Reducer.Internal.SetUnsorted.Internal.SortedConstructedMolecules
    as SortedConstructedMolecules

setUnsorted
    :: RequestManager.RequestManager
    -> SetUnsorted.SetUnsorted
    -> RequestManager.RequestManager

setUnsorted
    manager@(RequestManager.UnsortedAll _)
    payload
    = manager

setUnsorted
    manager@(RequestManager.UnsortedBuildingBlocks _)
    payload
    = manager

setUnsorted
    manager@(RequestManager.UnsortedConstructedMolecules _)
    payload
    = manager

setUnsorted
    (RequestManager.SortedAll manager)
    payload
    = SortedAll.setUnsorted manager payload

setUnsorted
    (RequestManager.SortedBuildingBlocks manager)
    payload
    = SortedBuildingBlocks.setUnsorted manager payload

setUnsorted
    (RequestManager.SortedConstructedMolecules manager)
    payload
    = SortedConstructedMolecules.setUnsorted manager payload
