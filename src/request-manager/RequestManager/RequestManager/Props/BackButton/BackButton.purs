module RequestManager.RequestManager.Internal.Props.Internal.BackButton
    ( BackButtonProps
    , backButtonProps
    ) where

import RequestManager.RequestManager.Internal.Props.Internal.BackButton.Internal.Props
    ( BackButtonProps
    )

import RequestManager.RequestManager.Internal.Props.Internal.BackButton.Internal.UnsortedAll
    as UnsortedAll

import RequestManager.RequestManager.Internal.Props.Internal.BackButton.Internal.UnsortedBuildingBlocks
    as UnsortedBuildingBlocks

import RequestManager.RequestManager.Internal.Props.Internal.BackButton.Internal.UnsortedConstructedMolecules
    as UnsortedConstructedMolecules

import RequestManager.RequestManager.Internal.Props.Internal.BackButton.Internal.SortedAll
    as SortedAll

import RequestManager.RequestManager.Internal.Props.Internal.BackButton.Internal.SortedBuildingBlocks
    as SortedBuildingBlocks

import RequestManager.RequestManager.Internal.Props.Internal.BackButton.Internal.SortedConstructedMolecules
    as SortedConstructedMolecules

import RequestManager.RequestManager.Internal.RequestManager
    ( RequestManager (..)
    )

backButtonProps
    :: forall a
    .  (UpdateMoleculePage -> a)
    -> RequestManager
    -> BackButtonProps a

backButtonProps updateMoleculePage (UnsortedAll manager)
    = UnsortedAll.backButtonProps
        updateMoleculePage
        manager

backButtonProps updateMoleculePage (UnsortedBuildingBlocks manager)
    = UnsortedBuildingBlocks.backButtonProps
        updateMoleculePage
        manager

backButtonProps
    updateMoleculePage
    (UnsortedConstructedMolecules manager)
    = UnsortedConstructedMolecules.backButtonProps
        updateMoleculePage
        manager

backButtonProps updateMoleculePage (SortedAll manager)
    = SortedAll.backButtonProps
        updateMoleculePage
        manager

backButtonProps updateMoleculePage (SortedBuildingBlocks manager)
    = SortedBuildingBlocks.backButtonProps
        updateMoleculePage
        manager

backButtonProps updateMoleculePage (SortedConstructedMolecules manager)
    = SortedConstructedMolecules.backButtonProps
        updateMoleculePage
        manager
