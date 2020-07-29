module StkVis.Payload
    ( Payload (..)
    , updateFields
    , updateMoleculePage
    , initializeMoleculeBrowser
    ) where

import Prelude
import RequestManager.RequestManager (RequestManager)
import MongoConfigurator.UpdateFields.MongoData (MongoData)
import MoleculeBrowser.UpdateMoleculePage.PageData (PageData)
import SelectingCollection (SelectingCollection)
import Molecules.Molecule (Molecule)
import StkVis.InitializeMoleculeBrowser as InitializeMoleculeBrowser

import StkVis.UpdateFields
    ( UpdateFields
    , updateFields
    ) as UpdateFields

import StkVis.UpdateMoleculePage
    ( UpdateMoleculePage
    , updateMoleculePage
    ) as UpdateMoleculePage


data Payload
    = UpdateFields UpdateFields.UpdateFields
    | UpdateMoleculePage UpdateMoleculePage.UpdateMoleculePage
    | InitializeMoleculeBrowser
        InitializeMoleculeBrowser.InitializeMoleculeBrowser

updateFields :: MongoData -> Payload
updateFields = UpdateFields <<< UpdateFields.updateFields

updateMoleculePage :: PageData -> Payload
updateMoleculePage
    = UpdateMoleculePage <<< UpdateMoleculePage.updateMoleculePage

initializeMoleculeBrowser
    :: RequestManager
    -> SelectingCollection Molecule
    -> Array String
    -> Payload

initializeMoleculeBrowser a b c
    = InitializeMoleculeBrowser
    $ InitializeMoleculeBrowser.initializeMoleculeBrowser a b c
