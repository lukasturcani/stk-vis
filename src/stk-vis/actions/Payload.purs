module StkVis.Payload
    ( Payload (..)
    , updateFields
    , updateMoleculePage
    ) where

import Prelude
import RequestManager.RequestManager (RequestManager)
import MongoConfigurator.UpdateFields.MongoData (MongoData)
import MoleculeBrowser.UpdateMoleculePage.PageData (PageData)
import SelectingCollection (SelectingCollection)
import Molecules.Molecule (Molecule)

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

updateFields :: MongoData -> Payload
updateFields = UpdateFields <<< UpdateFields.updateFields

updateMoleculePage :: PageData -> Payload
updateMoleculePage
    = UpdateMoleculePage <<< UpdateMoleculePage.updateMoleculePage
