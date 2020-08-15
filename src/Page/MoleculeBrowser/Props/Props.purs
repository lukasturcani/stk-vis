module Page.MoleculeBrowser.Props
    ( Props
    ) where

import Page.MoleculeBrowser.SortButton as SortButton
import Page.MoleculeBrowser.MoleculeTable as MoleculeTable

type Props a =
    { sortButton    :: SortButton.Props a
    , moleculeTable :: MoleculeTable.Props a
    }
