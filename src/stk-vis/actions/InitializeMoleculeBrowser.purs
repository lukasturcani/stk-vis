module StkVis.InitializeMoleculeBrowser
    ( InitializeMoleculeBrowser
    , toMoleculeBrowser
    ) where

import MoleculeBrowser.InitializeMoleculeBrowser
    ( InitializeMoleculeBrowser
    ) as MoleculeBrowser

newtype InitializeMoleculeBrowser
    = InitializeMoleculeBrowser
        MoleculeBrowser.InitializeMoleculeBrowser

toMoleculeBrowser
    :: InitializeMoleculeBrowser
    -> MoleculeBrowser.InitializeMoleculeBrowser
toMoleculeBrowser (InitializeMoleculeBrowser payload) = payload
