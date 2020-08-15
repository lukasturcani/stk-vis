module Page.MoleculeBrowser.Props
    ( Props
    ) where

import Page.MoleculeBrowser.SortButton as SortButton
import Page.MoleculeBrowser.MoleculeTable as MoleculeTable
import Page.MoleculeBrowser.TwoDViewer as TwoDViewer
import Page.MoleculeBrowser.ThreeDViewer as ThreeDViewer
import Page.MoleculeBrowser.NextButton as NextButton

type Props a =
    { sortButton    :: SortButton.Props a
    , moleculeTable :: MoleculeTable.Props a
    , twoDViewer    :: TwoDViewer.Props
    , threeDViewer  :: ThreeDViewer.Props
    , nextButton    :: NextButton.Props a
    }
