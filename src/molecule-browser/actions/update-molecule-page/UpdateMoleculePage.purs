module MoleculeBrowser.UpdateMoleculePage.UpdateMoleculePage
    ( UpdateMoleculePage
    , updateMoleculePage
    , molecules
    , columns
    ) where

import SelectingCollection (SelectingCollection)
import Molecules.Molecule (Molecule)

data UpdateMoleculePage = UpdateMoleculePage
    { _molecules: SelectingCollection Molecule
    , _columns: Array String
    }

type Molecules = SelectingCollection Molecule
type Columns = Array String

updateMoleculePage :: PageData -> UpdateMoleculePage
updateMoleculePage
    { molecules: molecules'
    , columns: columns'
    }
    = UpdateMoleculePage
        { _molecules: molecules'
        , _columns: columns'
        }

molecules :: UpdateMoleculePage -> Molecules
molecules (UpdateMoleculePage { _molecules }) = _molecules

columns :: UpdateMoleculePage -> Columns
columns (UpdateMoleculePage { _columns }) = _columns

