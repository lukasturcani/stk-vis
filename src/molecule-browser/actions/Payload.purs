module MoleculeBrowser.Payload
    ( Payload (..)
    , updateMoleculePage
    ) where

import MoleculeBrowser.UpdateMoleculePage.UpdateMoleculePage
    ( UpdateMoleculePage
    )

data Payload
    = UpdateMoleculePage UpdateMoleculePage

updateMoleculePage :: UpdateMoleculePage -> Payload
updateMoleculePage = UpdateMoleculePage
