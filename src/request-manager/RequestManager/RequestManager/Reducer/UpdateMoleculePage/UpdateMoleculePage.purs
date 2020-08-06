module RequestManager.RequestManager.Internal.Reducer.Internal.UpdateMoleculePage
    ( updateMoleculePage
    ) where

import RequestManager.UpdateMoleculePage as Payload

import RequestManager.RequestManager.Internal.RequestManager
    as RequestManager

import RequestManager.RequestManager.Internal.Reducer.Internal.UpdateMoleculePage.Internal.UnsortedAll
    as UnsortedAll

import RequestManager.RequestManager.Internal.Reducer.Internal.UpdateMoleculePage.Internal.UnsortedBuildingBlocks
    as UnsortedBuildingBlocks

import RequestManager.RequestManager.Internal.Reducer.Internal.UpdateMoleculePage.Internal.UnsortedConstructedMolecules
    as UnsortedConstructedMolecules

import RequestManager.RequestManager.Internal.Reducer.Internal.UpdateMoleculePage.Internal.SortedAll
    as SortedAll

import RequestManager.RequestManager.Internal.Reducer.Internal.UpdateMoleculePage.Internal.SortedBuildingBlocks
    as SortedBuildingBlocks

import RequestManager.RequestManager.Internal.Reducer.Internal.UpdateMoleculePage.Internal.SortedConstructedMolecules
    as SortedConstructedMolecules

updateMoleculePage
    :: RequestManager.RequestManager
    -> Payload.UpdateMoleculePage
    -> RequestManager.RequestManager

updateMoleculePage
    (RequestManager.UnsortedAll manager)
    payload
    = RequestManager.UnsortedAll
        (UnsortedAll.updateMoleculePage manager payload)

updateMoleculePage
    (RequestManager.UnsortedBuildingBlocks manager)
    payload
    = RequestManager.UnsortedBuildingBlocks
        (UnsortedBuildingBlocks.updateMoleculePage manager payload)

updateMoleculePage
    (RequestManager.UnsortedConstructedMolecules manager)
    payload
    = RequestManager.UnsortedConstructedMolecules
        (UnsortedConstructedMolecules.updateMoleculePage
            manager
            payload
        )

updateMoleculePage
    (RequestManager.SortedAll manager)
    payload
    = RequestManager.SortedAll
        (SortedAll.updateMoleculePage manager payload)

updateMoleculePage
    (RequestManager.SortedBuildingBlocks manager)
    payload
    = RequestManager.SortedBuildingBlocks
        (SortedBuildingBlocks.updateMoleculePage manager payload)

updateMoleculePage
    (RequestManager.SortedConstructedMolecules manager)
    payload
    = RequestManager.SortedConstructedMolecules
        (SortedConstructedMolecules.updateMoleculePage manager payload)
