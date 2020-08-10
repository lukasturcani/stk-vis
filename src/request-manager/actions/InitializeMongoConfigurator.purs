module RequestManager.InitializeMongoConfigurator
    ( InitializeMongoConfigurator
    , initializeMongoConfigurator
    , toMongoConfigurator
    ) where

import MongoConfigurator.InitializeMongoConfigurator as Base

newtype InitializeMongoConfigurator
    = InitializeMongoConfigurator Base.InitializeMongoConfigurator

initializeMongoConfigurator
    :: Base.ConfiguratorData
    -> InitializeMongoConfigurator

initializeMongoConfigurator configuratrData =
    InitializeMongoConfigurator
        (Base.initializeMongoConfigurator configuratorData)

toMongoConfigurator
    :: InitializeMongoConfigurator
    -> Base.InitializeMongoConfigurator

toMongoConfigurator (InitializeMongoConfigurator payload)
    = Base.toMongoConfigurator payload
