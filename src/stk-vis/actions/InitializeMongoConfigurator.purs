module StkVis.InitializeMongoConfigurator
    ( InitializeMongoConfigurator
    , initializeMongoConfigurator
    , toMongoConfigurator
    ) where

import Prelude
import MoleculeBrowser.InitializeMongoConfigurator as Browser
import MongoConfigurator.InitializeMongoConfigurator as Configurator
import RequestManager.InitializeMongoConfigurator as Manager

newtype InitializeMongoConfigurator
    = InitializeMongoConfigurator Browser.InitializeMongoConfigurator

initializeMongoConfigurator
    :: Manager.InitializeMongoConfigurator
    -> InitializeMongoConfigurator

initializeMongoConfigurator =
    InitializeMongoConfigurator <<< Browser.initializeMongoConfigurator

toMongoConfigurator
    :: InitializeMongoConfigurator
    -> Configurator.InitializeMongoConfigurator

toMongoConfigurator (InitializeMongoConfigurator payload)
    = Browser.toMongoConfigurator payload
