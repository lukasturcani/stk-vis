module MoleculeBrowser.MoleculeBrowser.Internal.Props
    ( Props
    , Helpers
    , props
    ) where

import MoleculeBrowser.MoleculeBrowser.Internal.MoleculeBrowser
    ( MoleculeBrowser (..)
    )

import RequestManager.RequestResult (RequestResult)

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

data Props a = Props
    { sortButton    :: SortButtonProps
    , moleculeTable :: MoleculeTableProps
    , twoDViewer    :: TwoDViewerProps
    , threeDViewer  :: ThreeDViewerProps
    , backButton    :: BackButtonProps a
    , nextButton    :: NextButtonProps
    }

type Helpers a =
    { pageRequestResultToAction :: (RequestResult -> a)
    }

props
    :: forall a
    .  Helpers a
    -> MoleculeBrowser
    -> Props a

props helpers (MoleculeBrowser {_requestManager, _molecules}) = Props
    { sortButton:       sortButtonProps _requestManager
    , moleculeTable:    moleculeTableProps _molecules
    , twoDViewer:       twoDViewerProps _molecules
    , threeDViewer:     threeDViewerProps _molecules

    , backButton: backButtonProps
        helpers.pageRequestResultToAction
        _requestManager

    , nextButton:       nextButtonProps _requestManager
    }
