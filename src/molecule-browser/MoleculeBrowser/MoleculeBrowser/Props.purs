module MoleculeBrowser.MoleculeBrowser.Internal.Props
    ( Props
    , ActionCreators
    , props
    ) where

import MoleculeBrowser.MoleculeBrowser.Internal.MoleculeBrowser
    ( MoleculeBrowser (..)
    )

import RequestManager.UpdateMoleculePage (UpdateMoleculePage)
import RequestManager.SetSorted (SetSorted)
import RequestManager.SetUnsorted (SetUnsorted)
import Molecules.SelectMolecule (SelectMolecule)


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
    { sortButton    :: SortButtonProps a
    , moleculeTable :: MoleculeTableProps a
    , twoDViewer    :: TwoDViewerProps
    , threeDViewer  :: ThreeDViewerProps
    , backButton    :: BackButtonProps a
    , nextButton    :: NextButtonProps a
    }

type ActionCreators a r =
    { updateMoleculePage :: UpdateMoleculePage -> a
    , setSorted          :: SetSorted -> a
    , setUnsorted        :: SetUnsorted -> a
    , selectMolecule     :: SelectMolecule -> a
    | r
    }

props
    :: forall a r
    .  ActionCreators a r
    -> MoleculeBrowser
    -> Props a

props
    actionCreators
    (MoleculeBrowser {_requestManager, _molecules})
    = Props
        { sortButton: sortButtonProps
            { setSorted: actionCreators.setSorted
            , setUnsorted: actionCreators.setUnsorted
            }
            _requestManager

        , moleculeTable: moleculeTableProps
            actionCreators
            _molecules

        , twoDViewer:       twoDViewerProps _molecules
        , threeDViewer:     threeDViewerProps _molecules

        , backButton: backButtonProps
            actionCreators.updateMoleculePage
            _requestManager

        , nextButton: nextButtonProps
            actionCreators.updateMoleculePage
            _requestManager
        }
