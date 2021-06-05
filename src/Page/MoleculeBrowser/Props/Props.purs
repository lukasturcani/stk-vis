module Page.MoleculeBrowser.Props
    ( Props (..)
    , NoViewers
    , TwoDViewer
    , ThreeDViewer
    , AllViewers
    ) where

import Page.MoleculeBrowser.SortButton as SortButton
import Page.MoleculeTable as MoleculeTable
import Page.TwoDViewer as TwoDViewer
import Page.ThreeDViewer as ThreeDViewer
import Page.MoleculeBrowser.NextButton as NextButton
import Page.MoleculeBrowser.BackButton as BackButton
import Page.MoleculeBrowser.Breadcrumbs as Breadcrumbs
import Page.ViewerSwitch as ViewerSwitch
import Page.SaveButton as SaveButton
import Page.ColumnButton as ColumnButton


data Props a
    = NoViewers (NoViewers a)
    | TwoDViewer (TwoDViewer a)
    | ThreeDViewer (ThreeDViewer a)
    | AllViewers (AllViewers a)


type NoViewers a =
    { sortButton         :: SortButton.Props a
    , moleculeTable      :: MoleculeTable.Props a
    , nextButton         :: NextButton.Props a
    , backButton         :: BackButton.Props a
    , breadcrumbs        :: Breadcrumbs.Props a
    , twoDViewerSwitch   :: ViewerSwitch.Props a
    , threeDViewerSwitch :: ViewerSwitch.Props a
    , saveButton         :: SaveButton.Props
    , columnButton       :: ColumnButton.Props a
    , type               :: String
    }

type TwoDViewer a =
    { sortButton         :: SortButton.Props a
    , moleculeTable      :: MoleculeTable.Props a
    , twoDViewer         :: TwoDViewer.Props
    , nextButton         :: NextButton.Props a
    , backButton         :: BackButton.Props a
    , breadcrumbs        :: Breadcrumbs.Props a
    , twoDViewerSwitch   :: ViewerSwitch.Props a
    , threeDViewerSwitch :: ViewerSwitch.Props a
    , saveButton         :: SaveButton.Props
    , columnButton       :: ColumnButton.Props a
    , type               :: String
    }

type ThreeDViewer a =
    { sortButton         :: SortButton.Props a
    , moleculeTable      :: MoleculeTable.Props a
    , threeDViewer       :: ThreeDViewer.Props
    , nextButton         :: NextButton.Props a
    , backButton         :: BackButton.Props a
    , breadcrumbs        :: Breadcrumbs.Props a
    , twoDViewerSwitch   :: ViewerSwitch.Props a
    , threeDViewerSwitch :: ViewerSwitch.Props a
    , saveButton         :: SaveButton.Props
    , columnButton       :: ColumnButton.Props a
    , type               :: String
    }

type AllViewers a =
    { sortButton         :: SortButton.Props a
    , moleculeTable      :: MoleculeTable.Props a
    , twoDViewer         :: TwoDViewer.Props
    , threeDViewer       :: ThreeDViewer.Props
    , nextButton         :: NextButton.Props a
    , backButton         :: BackButton.Props a
    , breadcrumbs        :: Breadcrumbs.Props a
    , twoDViewerSwitch   :: ViewerSwitch.Props a
    , threeDViewerSwitch :: ViewerSwitch.Props a
    , saveButton         :: SaveButton.Props
    , columnButton       :: ColumnButton.Props a
    , type               :: String
    }
