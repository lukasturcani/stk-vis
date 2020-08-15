module Page.MoleculeBrowser.MoleculeBrowser
    ( Props
    ) where

import Page.MoleculeBrowser.SortButton as SortButton

type Props a =
    { sortButton    :: SortButton.Props a
    }
