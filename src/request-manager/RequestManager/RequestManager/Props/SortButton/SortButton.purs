module RequestManager.RequestManager.Internal.Props.Internal.SortButton
    ( module Exports
    , sortButtonProps
    ) where


import RequestManager.RequestManager.Internal.Props.Internal.SortButton.Internal.Props
    ( SortButtonProps
    , ActionCreators
    ) as Exports

import RequestManager.RequestManager.Internal.Props.Internal.SortButton.Internal.UnsortedAll
    as UnsortedAll

import RequestManager.RequestManager.Internal.Props.Internal.SortButton.Internal.UnsortedBuildingBlocks
    as UnsortedBuildingBlocks

import RequestManager.RequestManager.Internal.Props.Internal.SortButton.Internal.UnsortedConstructedMolecules
    as UnsortedConstructedMolecules

import RequestManager.RequestManager.Internal.Props.Internal.SortButton.Internal.SortedAll
    as SortedAll

import RequestManager.RequestManager.Internal.Props.Internal.SortButton.Internal.SortedBuildingBlocks
    as SortedBuildingBlocks

import RequestManager.RequestManager.Internal.Props.Internal.SortButton.Internal.SortedConstructedMolecules
    as SortedConstructedMolecules

import RequestManager.RequestManager.Internal.RequestManager
    ( RequestManager (..)
    )

sortButtonProps
    :: forall a r
    .  Exports.ActionCreators a r
    -> RequestManager
    -> Exports.SortButtonProps a

sortButtonProps actionCreators (UnsortedAll manager)
    = UnsortedAll.sortButtonProps
        actionCreators
        manager

sortButtonProps actionCreators (UnsortedBuildingBlocks manager)
    = UnsortedBuildingBlocks.sortButtonProps
        actionCreators
        manager

sortButtonProps
    actionCreators
    (UnsortedConstructedMolecules manager)
    = UnsortedConstructedMolecules.sortButtonProps
        actionCreators
        manager

sortButtonProps actionCreators (SortedAll manager)
    = SortedAll.sortButtonProps
        actionCreators
        manager

sortButtonProps actionCreators (SortedBuildingBlocks manager)
    = SortedBuildingBlocks.sortButtonProps
        actionCreators
        manager

sortButtonProps actionCreators (SortedConstructedMolecules manager)
    = SortedConstructedMolecules.sortButtonProps
        actionCreators
        manager
