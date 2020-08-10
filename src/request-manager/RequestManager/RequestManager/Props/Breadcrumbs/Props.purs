module RequestManager.RequestManager.Internal.Props.Internal.Breadcrumbs.Internal.Props
    ( DispatchAction
    , BreadcrumbsProps
    , ActionCreators
    ) where

type DispatchAction a = a -> Effect Unit

data BreadcrumbsProps a =
    { onClick :: DispatchAction a -> Effect Unit
    }

type ActionCreators a r
    { initializeMongoConfigurator :: InitializeMongoConfigurator -> a
    | r
    }
