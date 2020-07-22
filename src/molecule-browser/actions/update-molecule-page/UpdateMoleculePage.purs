module MoleculeBrowser.UpdateMoleculePage.UpdateMoleculePage
    ( UpdateMoleculePage
    , updateMoleculePage
    ) where

import MoleculeBrowser.UpdateMoleculePage.PageData (PageData)

data UpdateMoleculePage = UpdateMoleculePage PageData

updateMoleculePage :: PageData -> UpdateMoleculePage
updateMoleculePage = UpdateMoleculePage
