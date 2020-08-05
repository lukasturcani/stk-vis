module MoleculeBrowser.Payload
    ( Payload (..)
    , updateMoleculePage
    , initializeMolecules
    , setSorted
    ) where

import MoleculeBrowser.UpdateMoleculePage.UpdateMoleculePage
    ( UpdateMoleculePage
    )

import MoleculeBrowser.InitializeMolecules
    ( InitializeMolecules
    )

import MoleculeBrowser.SetSorted
    ( SetSorted
    )

data Payload
    = UpdateMoleculePage UpdateMoleculePage
    | InitializeMolecules InitializeMolecules
    | SetSorted SetSorted

updateMoleculePage :: UpdateMoleculePage -> Payload
updateMoleculePage = UpdateMoleculePage

initializeMolecules :: InitializeMolecules -> Payload
initializeMolecules = InitializeMolecules

setSorted :: SetSorted -> Payload
setSorted = SetSorted
