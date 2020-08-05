module MoleculeBrowser.Payload
    ( Payload (..)
    , updateMoleculePage
    , initializeMolecules
    , setSorted
    , setUnsorted
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

import MoleculeBrowser.SetUnsorted
    ( SetUnsorted
    )

data Payload
    = UpdateMoleculePage UpdateMoleculePage
    | InitializeMolecules InitializeMolecules
    | SetSorted SetSorted
    | SetUnsorted SetUnsorted

updateMoleculePage :: UpdateMoleculePage -> Payload
updateMoleculePage = UpdateMoleculePage

initializeMolecules :: InitializeMolecules -> Payload
initializeMolecules = InitializeMolecules

setSorted :: SetSorted -> Payload
setSorted = SetSorted

setUnsorted :: SetUnsorted -> Payload
setUnsorted = SetUnsorted
