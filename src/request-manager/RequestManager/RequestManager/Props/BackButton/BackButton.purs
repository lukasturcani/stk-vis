module RequestManager.RequestManager.Internal.Props.Internal.BackButton
    ( BackButtonProps
    , backButtonProps
    ) where

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
