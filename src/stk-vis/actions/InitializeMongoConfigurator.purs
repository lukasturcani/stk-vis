module StkVis.InitializeMongoConfigurator
    ( InitializeMongoConfigurator
    , initializeMongoConfigurator
    , toMongoConfigurator
    ) where

import MoleculeBrowser.InitializeMongoConfigurator as MoleculeBrowser
import MongoConfigurator.InitializeMongoConfigurator as Configurator

newtype InitializeMongoConfigurator
    = InitializeMongoConfigurator
        MoleculeBrowser.InitializeMongoConfigurator

initializeMongoConfigurator
    :: MoleculeBrowser.InitializeMongoConfigurator
    -> InitializeMongoConfigurator

initializeMongoConfigurator = InitializeMongoConfigurator

toMongoConfigurator
    :: InitializeMongoConfigurator
    -> Configurator.InitializeMongoConfigurator

toMongoConfigurator (InitializeMongoConfigurator payload)
    = MoleculeBrowser.toMongoConfigurator payload
