module RequestManager.RequestManager.Internal.Props.Internal.Breadcrumbs.Internal.UnsortedBuildingBlocks
    ( breadcrumbsProps
    ) where

import Prelude

import RequestManager.RequestManager.Internal.RequestManager.UnsortedBuildingBlocks
    ( UnsortedBuildingBlocks (UnsortedBuildingBlocks)
    )

import RequestManager.RequestManager.Internal.Props.Internal.Breadcrumbs.Internal.Props
    ( BreadcrumbsProps (BreadcrumbsProps)
    , ActionCreators
    , DispatchAction
    )

import RequestManager.InitializeMongoConfigurator
    ( initializeMongoConfigurator
    )

import MongoConfigurator.SearchKind as SearchKind
import Effect (Effect)

breadcrumbsProps
    :: forall a r
    .  ActionCreators a r
    -> UnsortedBuildingBlocks
    -> BreadcrumbsProps a

breadcrumbsProps
    actionCreators
    (UnsortedBuildingBlocks
        { _url: url
        , _database: database
        , _moleculeKey: moleculeKey
        , _moleculeCollection: moleculeCollection
        , _constructedMoleculeCollection: constructedMoleculeCollection
        , _positionMatrixCollection: positionMatrixCollection
        , _numEntriesPerPage: numEntriesPerPage
        , _ignoredCollections: ignoredCollections
        }
    )
    = BreadcrumbsProps
        { onClick
        }
  where
    onClick :: DispatchAction a -> Effect Unit
    onClick dispatch = dispatch
        (actionCreators.initializeMongoConfigurator
            (initializeMongoConfigurator
                { url
                , database
                , moleculeKey
                , moleculeCollection
                , constructedMoleculeCollection
                , positionMatrixCollection
                , buildingBlockPositionMatrixCollection:
                    "building_block_position_matrices"
                , numEntriesPerPage
                , ignoredCollections
                , searchKind: SearchKind.UnsortedBuildingBlocks
                }
            )
        )
