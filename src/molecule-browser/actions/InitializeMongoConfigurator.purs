module MoleculeBrowser.InitializeMongoConfigurator
    ( InitializeMongoConfigurator
    , initializeMongoConfigurator
    , toMongoConfigurator
    ) where

import MongoConfigurator.InitializeMongoConfigurator as Base

newtype InitializeMongoConfigurator
    = InitializeMongoConfigurator Base.InitializeMongoConfigurator

initializeMongoConfigurator
    :: Base.InitializeMongoConfigurator -> InitializeMongoConfigurator
initializeMongoConfigurator = InitializeMongoConfigurator

toMongoConfigurator
    :: InitializeMongoConfigurator -> Base.InitializeMongoConfigurator
toMongoConfigurator (InitializeMongoConfigurator payload) = payload
