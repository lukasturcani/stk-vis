module StkVis.InitializeMoleculeBrowser.UnsortedConstructedMolecules
    ( InitializeUnsortedConstructedMolecules
    , initializeUnsortedConstructedMolecules
    , toMoleculeBrowser
    ) where

import MongoConfigurator.InitializeMoleculeBrowser.UnsortedConstructedMolecules
    as Base

import MoleculeBrowser.InitializeMoleculeBrowser.UnsortedConstructedMolecules
    as MoleculeBrowser

newtype InitializeUnsortedConstructedMolecules
    = InitializeUnsortedConstructedMolecules
        Base.InitializeUnsortedConstructedMolecules

initializeUnsortedConstructedMolecules
    :: Base.InitializeUnsortedConstructedMolecules
    -> InitializeUnsortedConstructedMolecules

initializeUnsortedConstructedMolecules
    = InitializeUnsortedConstructedMolecules

toMoleculeBrowser
    :: InitializeUnsortedConstructedMolecules
    -> MoleculeBrowser.InitializeUnsortedConstructedMolecules

toMoleculeBrowser (InitializeUnsortedConstructedMolecules payload)
    = Base.toMoleculeBrowser payload
