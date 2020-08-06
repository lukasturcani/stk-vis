module RequestManager.RequestManager.Internal.Reducer._UpdateMoleculePage
    ( updateMoleculePage
    ) where

import RequestManager.UpdateMoleculePage as Payload

import RequestManager.RequestManager.Internal.RequestManager
    as RequestManager

import RequestManager.RequestManager.Internal.Reducer._UpdateMoleculePage._UnsortedAll
    as UnsortedAll

import RequestManager.RequestManager.Internal.Reducer._UpdateMoleculePage._UnsortedBuildingBlocks
    as UnsortedBuildingBlocks

import RequestManager.RequestManager.Internal.Reducer._UpdateMoleculePage._UnsortedConstructedMolecules
    as UnsortedConstructedMolecules

import RequestManager.RequestManager.Internal.Reducer._UpdateMoleculePage._SortedAll
    as SortedAll

import RequestManager.RequestManager.Internal.Reducer._UpdateMoleculePage._SortedBuildingBlocks
    as SortedBuildingBlocks

import RequestManager.RequestManager.Internal.Reducer._UpdateMoleculePage._SortedConstructedMolecules
    as SortedConstructedMolecules

updateMoleculePage
    :: RequestManager.RequestManager
    -> Payload.UpdateMoleculePage
    -> RequestManager.RequestManager

updateMoleculePage
    (RequestManager.UnsortedAll manager)
    payload
    = UnsortedAll.updateMoleculePage manager payload

updateMoleculePage
    (RequestManager.UnsortedBuildingBlocks manager)
    payload
    = UnsortedBuildingBlocks.updateMoleculePage manager payload

updateMoleculePage
    (RequestManager.UnsortedConstructedMolecules manager)
    payload
    = UnsortedConstructedMolecules.updateMoleculePage manager payload

updateMoleculePage
    (RequestManager.SortedAll manager)
    payload
    = SortedAll.updateMoleculePage manager payload

updateMoleculePage
    (RequestManager.SortedBuildingBlocks manager)
    payload
    = SortedBuildingBlocks.updateMoleculePage manager payload

updateMoleculePage
    (RequestManager.SortedConstructedMolecules manager)
    payload
    = SortedConstructedMolecules.updateMoleculePage manager payload
