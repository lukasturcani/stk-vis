module RequestManager.RequestManager.Internal.Props.Internal.Breadcrumbs
    ( module Exports
    , breadcrumbsProps
    ) where

import RequestManager.RequestManager.Internal.Props.Internal.Breadcrumbs.Internal.Props
    ( BreadcrumbsProps
    ) as Exports

import RequestManager.RequestManager.Internal.Props.Internal.Breadcrumbs.Internal.UnsortedAll
    as UnsortedAll

import RequestManager.RequestManager.Internal.Props.Internal.Breadcrumbs.Internal.UnsortedBuildingBlocks
    as UnsortedBuildingBlocks

import RequestManager.RequestManager.Internal.Props.Internal.Breadcrumbs.Internal.UnsortedConstructedMolecules
    as UnsortedConstructedMolecules

import RequestManager.RequestManager.Internal.Props.Internal.Breadcrumbs.Internal.SortedAll
    as SortedAll

import RequestManager.RequestManager.Internal.Props.Internal.Breadcrumbs.Internal.SortedBuildingBlocks
    as SortedBuildingBlocks

import RequestManager.RequestManager.Internal.Props.Internal.Breadcrumbs.Internal.SortedConstructedMolecules
    as SortedConstructedMolecules

import RequestManager.RequestManager.Internal.RequestManager
    ( RequestManager (..)
    )

import RequestManager.InitializeMongoConfigurator
    ( InitializeMongoConfigurator
    , initializeMongoConfigurator
    )

breadcrumbsProps
    :: forall a r
    .  ActionCreators a r
    -> RequestManager
    -> Exports.BackButtonProps a

breadcrumbsProps actionCreators (UnsortedAll manager)
    = UnsortedAll.breadcrumbsProps
        actionCreators
        manager

breadcrumbsProps actionCreators (UnsortedBuildingBlocks manager)
    = UnsortedBuildingBlocks.breadcrumbsProps
        actionCreators
        manager

breadcrumbsProps
    actionCreators
    (UnsortedConstructedMolecules manager)
    = UnsortedConstructedMolecules.breadcrumbsProps
        actionCreators
        manager

breadcrumbsProps actionCreators (SortedAll manager)
    = SortedAll.breadcrumbsProps
        actionCreators
        manager

breadcrumbsProps actionCreators (SortedBuildingBlocks manager)
    = SortedBuildingBlocks.breadcrumbsProps
        actionCreators
        manager

breadcrumbsProps actionCreators (SortedConstructedMolecules manager)
    = SortedConstructedMolecules.breadcrumbsProps
        actionCreators
        manager
