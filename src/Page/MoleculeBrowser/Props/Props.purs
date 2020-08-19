module Page.MoleculeBrowser.Props
    ( Props
    ) where

import Page.MoleculeBrowser.SortButton as SortButton
import Page.MoleculeTable as MoleculeTable
import Page.TwoDViewer as TwoDViewer
import Page.ThreeDViewer as ThreeDViewer
import Page.MoleculeBrowser.NextButton as NextButton
import Page.MoleculeBrowser.BackButton as BackButton
import Page.MoleculeBrowser.Breadcrumbs as Breadcrumbs

type Props a =
    { sortButton    :: SortButton.Props a
    , moleculeTable :: MoleculeTable.Props a
    , twoDViewer    :: TwoDViewer.Props
    , threeDViewer  :: ThreeDViewer.Props
    , nextButton    :: NextButton.Props a
    , backButton    :: BackButton.Props a
    , breadcrumbs   :: Breadcrumbs.Props a
    , type          :: String
    }
