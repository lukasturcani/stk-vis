module RequestManager.RequestManager.Internal.Props.Internal.NextButton
    ( module Exports
    , nextButtonProps
    ) where

import RequestManager.RequestManager.Internal.Props.Internal.NextButton.Internal.Props
    ( NextButtonProps
    ) as Exports

import RequestManager.RequestManager.Internal.Props.Internal.NextButton.Internal.UnsortedAll
    as UnsortedAll

import RequestManager.RequestManager.Internal.Props.Internal.NextButton.Internal.UnsortedBuildingBlocks
    as UnsortedBuildingBlocks

import RequestManager.RequestManager.Internal.Props.Internal.NextButton.Internal.UnsortedConstructedMolecules
    as UnsortedConstructedMolecules

import RequestManager.RequestManager.Internal.Props.Internal.NextButton.Internal.SortedAll
    as SortedAll

import RequestManager.RequestManager.Internal.Props.Internal.NextButton.Internal.SortedBuildingBlocks
    as SortedBuildingBlocks

import RequestManager.RequestManager.Internal.Props.Internal.NextButton.Internal.SortedConstructedMolecules
    as SortedConstructedMolecules

import RequestManager.RequestManager.Internal.RequestManager
    ( RequestManager (..)
    )

import RequestManager.UpdateMoleculePage
    ( UpdateMoleculePage
    )

nextButtonProps
    :: forall a
    .  (UpdateMoleculePage -> a)
    -> RequestManager
    -> Exports.NextButtonProps a

nextButtonProps updateMoleculePage (UnsortedAll manager)
    = UnsortedAll.nextButtonProps
        updateMoleculePage
        manager

nextButtonProps updateMoleculePage (UnsortedBuildingBlocks manager)
    = UnsortedBuildingBlocks.nextButtonProps
        updateMoleculePage
        manager

nextButtonProps
    updateMoleculePage
    (UnsortedConstructedMolecules manager)
    = UnsortedConstructedMolecules.nextButtonProps
        updateMoleculePage
        manager

nextButtonProps updateMoleculePage (SortedAll manager)
    = SortedAll.nextButtonProps
        updateMoleculePage
        manager

nextButtonProps updateMoleculePage (SortedBuildingBlocks manager)
    = SortedBuildingBlocks.nextButtonProps
        updateMoleculePage
        manager

nextButtonProps updateMoleculePage (SortedConstructedMolecules manager)
    = SortedConstructedMolecules.nextButtonProps
        updateMoleculePage
        manager
