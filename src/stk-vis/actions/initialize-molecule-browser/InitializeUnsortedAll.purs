module StkVis.InitializeMoleculeBrowser.UnsortedAll
    ( InitializeUnsortedAll
    , initializeUnsortedAll
    , toMongoConfigurator
    ) where

import MongoConfigurator.InitializeMoleculeBrowser.UnsortedAll
    as Configurator

newtype InitializeUnsortedAll
    = InitializeUnsortedAll Configurator.InitializeUnsortedAll

initializeUnsortedAll
    :: Configurator.InitializeUnsortedAll
    -> InitializeUnsortedAll

initializeUnsortedAll = InitializeUnsortedAll


toMongoConfigurator
    :: InitializeUnsortedAll -> Configurator.InitializeUnsortedAll
toMongoConfigurator (InitializeUnsortedAll payload) = payload
