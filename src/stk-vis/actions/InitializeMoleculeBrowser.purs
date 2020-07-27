module StkVis.InitializeMoleculeBrowser
    ( InitializeMoleculeBrowser
    , toMoleculeBrowser
    , initializeMoleculeBrowser
    ) where

import Prelude
import RequestManager.RequestManager (RequestManager)
import SelectingCollection (SelectingCollection)
import Molecules.Molecule (Molecule)

import MoleculeBrowser.InitializeMoleculeBrowser
    ( InitializeMoleculeBrowser
    , initializeMoleculeBrowser
    ) as MoleculeBrowser

newtype InitializeMoleculeBrowser
    = InitializeMoleculeBrowser
        MoleculeBrowser.InitializeMoleculeBrowser

toMoleculeBrowser
    :: InitializeMoleculeBrowser
    -> MoleculeBrowser.InitializeMoleculeBrowser
toMoleculeBrowser (InitializeMoleculeBrowser payload) = payload

initializeMoleculeBrowser
    :: RequestManager
    -> SelectingCollection Molecule
    -> Array String
    -> InitializeMoleculeBrowser
initializeMoleculeBrowser requestManager molecules columns
    = InitializeMoleculeBrowser $
        MoleculeBrowser.initializeMoleculeBrowser
            requestManager
            molecules
            columns

