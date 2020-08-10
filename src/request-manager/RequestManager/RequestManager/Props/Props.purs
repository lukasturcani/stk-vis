module RequestManager.RequestManager.Internal.Props
    ( module Exports
    , ActionCreators
    ) where

import RequestManager.RequestManager.Internal.Props.Internal.NextButton
    ( NextButtonProps
    , nextButtonProps
    ) as Exports

import RequestManager.RequestManager.Internal.Props.Internal.BackButton
    ( BackButtonProps
    , backButtonProps
    ) as Exports

import RequestManager.RequestManager.Internal.Props.Internal.SortButton
    ( SortButtonProps
    , sortButtonProps
    ) as Exports

import RequestManager.RequestManager.Internal.Props.Internal.Breadcrumbs
    ( BreadcrumbsProps
    , breadcrumbsProps
    ) as Exports


import RequestManager.SetSorted (SetSorted)
import RequestManager.SetUnsorted (SetUnsorted)
import RequestManager.UpdateMoleculePage (UpdateMoleculePage)

import RequestManager.InitializeMongoConfigurator
    ( InitializeMongoConfigurator
    )

type ActionCreators a r =
    { setSorted                   :: SetSorted -> a
    , setUnsorted                 :: SetUnsorted -> a
    , updateMoleculePage          :: UpdateMoleculePage -> a
    , initializeMongoConfigurator :: InitializeMongoConfigurator -> a
    | r
    }
