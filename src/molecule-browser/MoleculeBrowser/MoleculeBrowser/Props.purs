module MoleculeBrowser.MoleculeBrowser.Internal.Props
    ( Props
    , props
    ) where

import MoleculeBrowser.SortType (SortType)
import MoleculeBrowser.PageData (PageData)

import MoleculeBrowser.MoleculeBrowser.Internal.MoleculeBrowser
    ( MoleculeBrowser
    )


data Props = Props
    { sortButton    :: SortButtonProps
    , moleculeTable :: MoleculeTableProps
    , twoDViewer    :: TwoDViewerProps
    , threeDViewer  :: ThreeDViewerProps
    , backButton    :: BackButtonProps
    , nextButton    :: NextButtonProps
    }
