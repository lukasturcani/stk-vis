module MoleculeBrowser.MoleculeBrowser.Internal.Props
    ( Props
    , ActionCreators
    , props
    ) where

import MoleculeBrowser.MoleculeBrowser.Internal.MoleculeBrowser
    ( MoleculeBrowser (..)
    )

import RequestManager.UpdateMoleculePage (UpdateMoleculePage)


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

type ActionCreators a =
    { updateMoleculePage :: (UpdateMoleculePage -> a)
    }

props
    :: forall a
    .  ActionCreators a
    -> MoleculeBrowser
    -> Props a

props
    actionCreators
    (MoleculeBrowser {_requestManager, _molecules})
    = Props
        { sortButton:       sortButtonProps _requestManager
        , moleculeTable:    moleculeTableProps _molecules
        , twoDViewer:       twoDViewerProps _molecules
        , threeDViewer:     threeDViewerProps _molecules

        , backButton: backButtonProps
            actionCreators.updateMoleculePage
            _requestManager

        , nextButton:       nextButtonProps _requestManager
        }
