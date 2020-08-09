module StkVis.InitializeMoleculeBrowser.UnsortedAll
    ( InitializeUnsortedAll
    , initializeUnsortedAll
    , toMoleculeBrowser
    ) where

import MongoConfigurator.InitializeMoleculeBrowser.UnsortedAll
    as Base

import MoleculeBrowser.InitializeMoleculeBrowser.UnsortedAll
    as MoleculeBrowser

newtype InitializeUnsortedAll
    = InitializeUnsortedAll Base.InitializeUnsortedAll

initializeUnsortedAll
    :: Base.InitializeUnsortedAll
    -> InitializeUnsortedAll

initializeUnsortedAll = InitializeUnsortedAll


toMoleculeBrowser
    :: InitializeUnsortedAll -> MoleculeBrowser.InitializeUnsortedAll
toMoleculeBrowser (InitializeUnsortedAll payload)
    = Base.toMoleculeBrowser payload
