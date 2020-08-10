module RequestManager.RequestManager.Internal.Props.Internal.Breadcrumbs.Internal.Props
    ( DispatchAction
    , BreadcrumbsProps (..)
    , ActionCreators
    ) where

import Prelude
import Effect (Effect)
import MongoConfigurator.InitializeMongoConfigurator
    ( InitializeMongoConfigurator
    )

type DispatchAction a = a -> Effect Unit

data BreadcrumbsProps a = BreadcrumbsProps
    { onClick :: DispatchAction a -> Effect Unit
    }

type ActionCreators a r =
    { initializeMongoConfigurator :: InitializeMongoConfigurator -> a
    | r
    }
