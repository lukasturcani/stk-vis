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

data SortButtonProps = SortButtonProps
    {
    }

data MoleculeTableProps = MoleculeTableProps
    {
    }

data TwoDViewerProps = TwoDViewerProps
    {
    }

data ThreeDViewerProps = ThreeDViewerProps
    {
    }

data BackButtonProps = BackButtonProps
    {
    }

data NextButtonProps = NextButtonProps
    {
    }


props :: MoleculeBrowser -> Props
props
