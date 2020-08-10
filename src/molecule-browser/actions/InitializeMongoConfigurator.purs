module MoleculeBrowser.InitializeMongoConfigurator
    ( InitializeMongoConfigurator
    , initializeMongoConfigurator
    , toMongoConfigurator
    ) where

import MongoConfigurator.InitializeMongoConfigurator as Configurator
import RequestManager.InitializeMongoConfigurator as Manager

newtype InitializeMongoConfigurator
    = InitializeMongoConfigurator Manager.InitializeMongoConfigurator

initializeMongoConfigurator
    :: Manager.InitializeMongoConfigurator
    -> InitializeMongoConfigurator

initializeMongoConfigurator = InitializeMongoConfigurator

toMongoConfigurator
    :: InitializeMongoConfigurator
    -> Configurator.InitializeMongoConfigurator

toMongoConfigurator (InitializeMongoConfigurator payload)
    = Manager.toMongoConfigurator payload
