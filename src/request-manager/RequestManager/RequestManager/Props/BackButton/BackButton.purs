module RequestManager.RequestManager.Internal.Props.Internal.BackButton
    ( BackButtonProps
    , ActionCreators
    , backButtonProps
    ) where

import RequestManager.RequestManager.Internal.RequestManager
    ( RequestManager (..)
    )

type ActionCreators a =
    { initializeUnsortedAll
        :: InitializeUnsortedAll -> a

    , initializeUnsortedBuildingBlocks
        :: InitializeUnsortedBuildingBlocks -> a

    , initializeUnsortedConstructedMolecules
        :: InitializeUnsortedConstructedMolecules -> a

    , initializeSortedAll
        :: InitializeSortedAll -> a

    , initializeSortedBuildingBlocks
        :: InitializeSortedBuildingBlocks -> a

    , initializeSortedConstructedMolecules
        :: InitializeSortedConstructedMolecules -> a
    }

backButtonProps
    :: forall a
    .  ActionCreators a
    -> RequestManager
    -> BackButtonProps a

backButtonProps helpers (UnsortedAll manager)
    = UnsortedAll.backButtonProps
        helpers.initializeUnsortedAll
        manager

backButtonProps helpers (UnsortedBuildingBlocks manager)
    = UnsortedBuildingBlocks.backButtonProps
        helpers.initializeUnsortedBuildingBlocks
        manager

backButtonProps helpers (UnsortedConstructedMolecules manager)
    = UnsortedConstructedMolecules.backButtonProps
        helpers.initializeUnsortedConstructedMolecules
        manager

backButtonProps helpers (SortedAll manager)
    = SortedAll.backButtonProps
        helpers.initializeSortedAll
        manager

backButtonProps helpers (SortedBuildingBlocks manager)
    = SortedBuildingBlocks.backButtonProps
        helpers.initializeSortedBuildingBlocks
        manager

backButtonProps helpers (SortedConstructedMolecules manager)
    = SortedConstructedMolecules.backButtonProps
        helpers.initializeSortedConstructedMolecules
        manager
