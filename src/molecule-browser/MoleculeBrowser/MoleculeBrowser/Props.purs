module MoleculeBrowser.MoleculeBrowser.Internal.Props
    ( Props
    , props
    ) where

import MoleculeBrowser.MoleculeBrowser.Internal.MoleculeBrowser
    ( MoleculeBrowser (..)
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
    { disabled       :: Boolean
    , requestOptions :: RequestOptions
    }

data NextButtonProps = NextButtonProps
    {
    }


props :: MoleculeBrowser -> Props
props MoleculeBrowser = Props
    { sortButton: SortButtonProps {}
    , moleculeTable: MoleculeTableProps {}
    , twoDViewer: TwoDViewerProps {}
    , threeDViewer: ThreeDViewerProps {}
    , backButton: BackButtonProps {}
    , nextButton: NextButtonProps {}
    }
