module RequestManager.RequestManager.Internal.Props.Internal.Breadcrumbs
    ( BreadcrumbsProps
    , DispatchAction
    , breadcrumbsProps
    )

import RequestManager.InitializeMongoConfigurator
    ( InitializeMongoConfigurator
    , initializeMongoConfigurator
    )

type DispatchAction a = a -> Effect Unit

data BreadcrumbsProps a =
    { onClick :: DispatchAction a -> Effect Unit
    }

type ActionCreators a r
    { initializeMongoConfigurator :: InitializeMongoConfigurator -> a
    | r
    }

breadcrumbsProps
    :: forall a r
    .  ActionCreators a r
    -> RequestManager
    -> BreadcrumbsProps a

breadcrumbsProps
    actionCreators
    requestManager
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
                , buildingBlockPositionMatrixCollection
                , numEntriesPerPage
                , ignoredCollections
                , searchKind
                }
            )
        )

