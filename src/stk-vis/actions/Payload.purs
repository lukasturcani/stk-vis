module StkVis.Payload
    ( Payload (..)
    , updateFields
    , updateMoleculePage
    ) where

import Prelude
import MongoConfigurator.UpdateFields.MongoData (MongoData)

import StkVis.UpdateFields
    ( UpdateFields
    , updateFields
    ) as UpdateFields

import StkVis.UpdateMoleculePage
    ( UpdateMoleculePage
    ) as UpdateMoleculePage


data Payload
    = UpdateFields UpdateFields.UpdateFields
    | UpdateMoleculePage UpdateMoleculePage.UpdateMoleculePage

updateFields :: MongoData -> Payload
updateFields = UpdateFields <<< UpdateFields.updateFields

updateMoleculePage :: UpdateMoleculePage -> Payload
updateMoleculePage = UpdateMoleculePage
