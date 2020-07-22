module StkVis.UpdateMoleculePage
    ( UpdateMoleculePage
    , updateMoleculePage
    ) where

import Prelude
import MoleculeBrowser.UpdateMoleculePage.PageData (PageData)

import MoleculeBrowser.UpdateMoleculePage.UpdateMoleculePage
    ( UpdateMoleculePage
    , updateMoleculePage
    ) as UpdateMoleculePage


newtype UpdateMoleculePage
    = UpdateMoleculePage UpdateMoleculePage.UpdateMoleculePage

updateMoleculePage :: PageData -> UpdateMoleculePage
updateMoleculePage
    = UpdateMoleculePage <<< UpdateMoleculePage.updateMoleculePage
