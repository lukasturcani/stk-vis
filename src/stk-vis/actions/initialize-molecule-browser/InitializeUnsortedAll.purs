module StkVis.InitializeMoleculeBrowser.UnsortedAll
    ( InitializeUnsortedAll
    , initializeUnsortedAll
    , toMongoConfigurator
    ) where

import MongoConfigurator.InitializeMoleculeBrowser.UnsortedAll
    as Base

newtype InitializeUnsortedAll
    = InitializeUnsortedAll Base.InitializeUnsortedAll

initializeUnsortedAll
    :: Base.InitializeUnsortedAll
    -> InitializeUnsortedAll

initializeUnsortedAll = InitializeUnsortedAll


toMongoConfigurator
    :: InitializeUnsortedAll -> Base.InitializeUnsortedAll
toMongoConfigurator (InitializeUnsortedAll payload) = payload
