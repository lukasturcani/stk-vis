module MoleculeBrowser.UpdateMoleculePage.PageData
    ( PageData
    ) where

import SelectingCollection (SelectingCollection)
import Molecules.Molecule (Molecule)

type PageData =
    { molecules :: SelectingCollection Molecule
    , columns   :: Array String
    }
