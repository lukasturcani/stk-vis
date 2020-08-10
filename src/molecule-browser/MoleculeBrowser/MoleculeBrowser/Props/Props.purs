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

import RequestManager.InitializeMongoConfigurator
    ( InitializeMongoConfigurator
    )


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
    , BreadcrumbsProps
    , breadcrumbsProps
    )

data Props a = Props
    { sortButton    :: SortButtonProps a
    , moleculeTable :: MoleculeTableProps a
    , twoDViewer    :: TwoDViewerProps
    , threeDViewer  :: ThreeDViewerProps
    , backButton    :: BackButtonProps a
    , nextButton    :: NextButtonProps a
    , breadcrumbs   :: BreadcrumbsProps a
    , type          :: String
    }

type ActionCreators a r =
    { updateMoleculePage          :: UpdateMoleculePage -> a
    , setSorted                   :: SetSorted -> a
    , setUnsorted                 :: SetUnsorted -> a
    , selectMolecule              :: SelectMolecule -> a
    , initializeMongoConfigurator :: InitializeMongoConfigurator -> a
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
            actionCreators
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

        , breadcrumbs : breadcrumbsProps actionCreators _requestManager
        , type: "Molecule Browser"
        }
