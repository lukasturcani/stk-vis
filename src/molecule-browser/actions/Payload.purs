module MoleculeBrowser.Payload
    ( Payload (..)
    , updateMoleculePage
    , initializeMoleculeBrowser
    ) where

import MoleculeBrowser.UpdateMoleculePage.UpdateMoleculePage
    ( UpdateMoleculePage
    )

import MoleculeBrowser.InitializeMoleculeBrowser
    ( InitializeMoleculeBrowser
    )

data Payload
    = UpdateMoleculePage UpdateMoleculePage
    | InitializeMoleculeBrowser InitializeMoleculeBrowser

updateMoleculePage :: UpdateMoleculePage -> Payload
updateMoleculePage = UpdateMoleculePage

initializeMoleculeBrowser :: InitializeMoleculeBrowser -> Payload
initializeMoleculeBrowser = InitializeMoleculeBrowser
