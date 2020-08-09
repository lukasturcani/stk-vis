module StkVis.InitializeMoleculeBrowser.UnsortedConstructedMolecules
    ( InitializeUnsortedConstructedMolecules
    , initializeUnsortedConstructedMolecules
    , toMongoConfigurator
    ) where

import MoleculeBrowser.InitializeMoleculeBrowser.UnsortedConstructedMolecules
    as Base

newtype InitializeUnsortedConstructedMolecules
    = InitializeUnsortedConstructedMolecules
        Base.InitializeUnsortedConstructedMolecules

initializeUnsortedConstructedMolecules
    :: Base.InitializeUnsortedConstructedMolecules
    -> InitializeUnsortedConstructedMolecules

initializeUnsortedConstructedMolecules
    = InitializeUnsortedConstructedMolecules

toMongoConfigurator
    :: InitializeUnsortedConstructedMolecules
    -> Base.InitializeUnsortedConstructedMolecules

toMongoConfigurator (InitializeUnsortedConstructedMolecules payload)
    = payload
