module RequestManager.RequestManager.Internal.Reducer.Internal.SetSorted
    ( setSorted
    ) where

import RequestManager.RequestManager.Internal.RequestManager
    as RequestManager

import RequestManager.SetSorted as Payload

import RequestManager.RequestManager.Internal.Reducer.Internal.SetSorted.Internal.UnsortedAll
    as UnsortedAll

import RequestManager.RequestManager.Internal.Reducer.Internal.SetSorted.Internal.UnsortedBuildingBlocks
    as UnsortedBuildingBlocks

import RequestManager.RequestManager.Internal.Reducer.Internal.SetSorted.Internal.UnsortedConstructedMolecules
    as UnsortedConstructedMolecules

import RequestManager.RequestManager.Internal.Reducer.Internal.SetSorted.Internal.SortedAll
    as SortedAll

import RequestManager.RequestManager.Internal.Reducer.Internal.SetSorted.Internal.SortedBuildingBlocks
    as SortedBuildingBlocks

import RequestManager.RequestManager.Internal.Reducer.Internal.SetSorted.Internal.SortedConstructedMolecules
    as SortedConstructedMolecules

setSorted
    :: RequestManager.RequestManager
    -> Payload.SetSorted
    -> RequestManager.RequestManager

setSorted
    (RequestManager.UnsortedAll manager)
    payload
    = UnsortedAll.setSorted manager payload

setSorted
    (RequestManager.UnsortedBuildingBlocks manager)
    payload
    = UnsortedBuildingBlocks.setSorted manager payload

setSorted
    (RequestManager.UnsortedConstructedMolecules manager)
    payload
    = UnsortedConstructedMolecules.setSorted manager payload

setSorted
    (RequestManager.SortedAll manager)
    payload
    = SortedAll.setSorted manager payload

setSorted
    (RequestManager.SortedBuildingBlocks manager)
    payload
    = SortedBuildingBlocks.setSorted manager payload

setSorted
    (RequestManager.SortedConstructedMolecules manager)
    payload
    = SortedConstructedMolecules.setSorted manager payload

