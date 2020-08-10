module RequestManager.RequestManager.Internal.Props.Internal.Breadcrumbs.Internal.SortedAll
    ( breadcrumbsProps
    ) where

import Prelude

import RequestManager.RequestManager.Internal.RequestManager.SortedAll
    ( SortedAll (SortedAll)
    )

import RequestManager.RequestManager.Internal.Props.Internal.Breadcrumbs.Internal.Props
    ( BreadcrumbsProps (BreadcrumbsProps)
    , ActionCreators
    , DispatchAction
    )

import RequestManager.InitializeMongoConfigurator
    ( InitializeMongoConfigurator
    , initializeMongoConfigurator
    )

import MongoConfigurator.SearchKind as SearchKind
import Effect (Effect)

breadcrumbsProps
    :: forall a r
    .  ActionCreators a r
    -> SortedAll
    -> BreadcrumbsProps a

breadcrumbsProps
    actionCreators
    (SortedAll
        { _url: url
        , _database: database
        , _moleculeKey: moleculeKey
        , _moleculeCollection: moleculeCollection
        , _positionMatrixCollection: positionMatrixCollection
        , _buildingBlockPositionMatrixCollection:
            buildingBlockPositionMatrixCollection
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
                , constructedMoleculeCollection:
                    "constructed_molecules"
                , positionMatrixCollection
                , buildingBlockPositionMatrixCollection
                , numEntriesPerPage
                , ignoredCollections
                , searchKind: SearchKind.UnsortedAll
                }
            )
        )

