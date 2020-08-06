module StkVis.UpdateMoleculePage
    ( UpdateMoleculePage
    , updateMoleculePage
    , toMoleculeBrowser
    ) where

import Prelude
import RequestManager.UpdateMoleculePage as Manager
import MoleculeBrowser.UpdateMoleculePage as Browser


newtype UpdateMoleculePage
    = UpdateMoleculePage Browser.UpdateMoleculePage

updateMoleculePage :: Manager.UpdateMoleculePage -> UpdateMoleculePage
updateMoleculePage
    =   UpdateMoleculePage
    <<< Browser.updateMoleuclePage
    <<< Manager.updateMoleculePage

toMoleculeBrowser :: UpdateMoleculePage -> Browser.UpdateMoleculePage
toMoleculeBrowser (UpdateMoleculePage payload) = payload
