module MoleculeBrowser.MoleculeBrowser.Internal.Props
    ( Props
    , props
    ) where

import Molecules.Molecules
    ( MoleculeTableProps
    , moleculeTableProps
    , TwoDViewerProps
    , twoDViewerProps
    , ThreeDViewerProps
    , threeDViewerProps
    )

import RequestManager.RequestManager
    ( NextButtonProps
    , nextButtonProps
    , BackButtonProps
    , backButtonProps
    , SortButtonProps
    , sortButtonProps
    )

data Props = Props
    { sortButton    :: SortButtonProps
    , moleculeTable :: MoleculeTableProps
    , twoDViewer    :: TwoDViewerProps
    , threeDViewer  :: ThreeDViewerProps
    , backButton    :: BackButtonProps
    , nextButton    :: NextButtonProps
    }

props :: MoleculeBrowser -> Props
props (MoleculeBrowser {_requestManager, _molecules}) = Props
    { sortButton:       sortButtonProps _requestManager
    , moleculeTable:    moleculeTableProps _molecules
    , twoDViewer:       twoDViewerProps _molecules
    , threeDViewer:     threeDViewerProps _molecules
    , backButton:       backButtonProps _requestManager
    , nextButton:       nextButtonProps _requestManager
    }
