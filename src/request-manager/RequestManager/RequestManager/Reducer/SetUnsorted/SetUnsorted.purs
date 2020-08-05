module RequestManager.RequestManager.Internal.Reducer.Internal.SetUnsorted
    ( setUnsorted
    ) where

import RequestManager.RequestManager.Internal.RequestManager
    as RequestManager

import RequestManager.SetUnsorted as SetUnsorted

import RequestManager.RequestManager.Internal.Reducer.Internal.SetUnsorted.Internal.UnsortedAll
    as UnsortedAll

import RequestManager.RequestManager.Internal.Reducer.Internal.SetUnsorted.Internal.UnsortedBuildingBlocks
    as UnsortedBuildingBlocks

import RequestManager.RequestManager.Internal.Reducer.Internal.SetUnsorted.Internal.UnsortedConstructedMolecules
    as UnsortedConstructedMolecules

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
    (RequestManager.UnsortedAll manager)
    payload
    = UnsortedAll.setUnsorted manager payload

setUnsorted
    (RequestManager.UnsortedBuildingBlocks manager)
    payload
    = UnsortedBuildingBlocks.setUnsorted manager payload

setUnsorted
    (RequestManager.UnsortedConstructedMolecules manager)
    payload
    = UnsortedConstructedMolecules.setUnsorted manager payload

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
