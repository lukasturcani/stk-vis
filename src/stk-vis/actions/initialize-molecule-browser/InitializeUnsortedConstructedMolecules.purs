module StkVis.InitializeMoleculeBrowser.UnsortedConstructedMolecules
    ( InitializeUnsortedConstructedMolecules
    , initializeUnsortedConstructedMolecules
    , toMongoConfigurator
    ) where

import MongoConfigurator.InitializeMoleculeBrowser.UnsortedConstructedMolecules
    as Configurator

newtype InitializeUnsortedConstructedMolecules
    = InitializeUnsortedConstructedMolecules
        Configurator.InitializeUnsortedConstructedMolecules

initializeUnsortedConstructedMolecules
    :: Configurator.InitializeUnsortedConstructedMolecules
    -> InitializeUnsortedConstructedMolecules

initializeUnsortedConstructedMolecules
    = InitializeUnsortedConstructedMolecules

toMongoConfigurator
    :: InitializeUnsortedConstructedMolecules
    -> Configurator.InitializeUnsortedConstructedMolecules

toMongoConfigurator (InitializeUnsortedConstructedMolecules payload)
    = payload
