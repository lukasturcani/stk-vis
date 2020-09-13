module Page.MoleculeBrowser.UnsortedAll
    ( Model
    , Action
    , Payload
    , reducer
    , init
    , debugInit
    , props
    , updateMoleculePage
    , doNothing
    , selectMolecule
    , setTwoDViewer
    , setThreeDViewer
    ) where

import Prelude
import Data.Array as Array
import PageKind (PageKind)
import PageKind as PageKind
import SortType (SortType)
import SortType as SortType
import SelectingCollection (SelectingCollection)
import SelectingCollection as SelectingCollection
import Molecule (Molecule)
import Molecule as Molecule
import DispatchAction (DispatchAction)
import Page.MoleculeBrowser.SortButton as SortButton
import Page.MoleculeBrowser.NextButton as NextButton
import Page.MoleculeBrowser.BackButton as BackButton
import Page.ViewerSwitch as ViewerSwitch
import Page.SaveButton as SaveButton
import Effect.Promise (class Deferred, Promise, catch)
import Requests.UnsortedAll as UnsortedRequest
import Requests.SortedAll as SortedRequest
import Requests.BuildingBlocks as BBRequest
import Effect.Unsafe (unsafePerformEffect)
import Effect.Uncurried (runEffectFn1)
import Partial.Unsafe (unsafePartial)
import Data.Map as Map
import Data.Tuple (Tuple (Tuple), fst, snd)
import Data.Maybe as Maybe
import ValidatedMolecule as Validated
import ValidatedMolecule.Position as Position
import ValidatedMolecule.ChemicalSymbol as ChemicalSymbol
import Page.MoleculeBrowser.Props (Props)
import Page.MoleculeBrowser.Props as Props
import Config as Config
import Page.MongoConfigurator.SearchKind as SearchKind
import Snackbar (Snackbar)
import Snackbar as Snackbar


---- MODEL ----


type Model =
    { url                               :: String
    , database                          :: String
    , moleculeKey                       :: String
    , moleculeCollection                :: String
    , constructedMoleculeCollection     :: String
    , positionMatrixCollection          :: String
    , buildingBlockPositionMatrixCollection :: String
    , pageIndex                         :: Int
    , numEntriesPerPage                 :: Int
    , ignoredCollections                :: Array String
    , pageKind                          :: PageKind
    , valueCollections                  :: Array String
    , columns                           :: Array String
    , molecules                         :: SelectingCollection Molecule
    , twoDViewer                        :: Boolean
    , threeDViewer                      :: Boolean
    }

type Molecules r =
    { molecules :: SelectingCollection Molecule
    | r
    }

type MoleculePage r =
    { columns          :: Array String
    , molecules        :: SelectingCollection Molecule
    , pageIndex        :: Int
    , pageKind         :: PageKind
    , valueCollections :: Array String
    | r
    }

type RequestConfig r =
    { url                                   :: String
    , database                              :: String
    , moleculeKey                           :: String
    , moleculeCollection                    :: String
    , constructedMoleculeCollection         :: String
    , positionMatrixCollection              :: String
    , buildingBlockPositionMatrixCollection :: String
    , pageIndex                             :: Int
    , numEntriesPerPage                     :: Int
    , ignoredCollections                    :: Array String
    , pageKind                              :: PageKind
    | r
    }

init :: Config.UnsortedAll -> Model
init config = config

debugInit :: Model
debugInit =
    { url: "mongodb://localhost:27017"
    , database: "stkVis"
    , moleculeKey: "InChIKey"
    , moleculeCollection: "molecules"
    , constructedMoleculeCollection: "constructed_molecules"
    , positionMatrixCollection: "position_matrices"
    , buildingBlockPositionMatrixCollection:
        "building_block_position_matrices"
    , pageIndex: 0
    , numEntriesPerPage: 34
    , ignoredCollections: []
    , pageKind: PageKind.First
    , valueCollections: ["numAtoms"]
    , columns: ["InChIKey", "numAtoms"]
    , molecules: SelectingCollection.selectingCollection [] molecule []
    , twoDViewer: true
    , threeDViewer: true
    }
  where
    molecule = Molecule.molecule
        false
        "CH4"
        validated
        (Map.fromFoldable
            [ Tuple "one"   "1"
            , Tuple "two"   "2"
            , Tuple "three" "3"
            , Tuple "four"  "4"
            ]
        )
      where
        validated :: Validated.Molecule
        validated = unsafePartial (Maybe.fromJust maybeMolecule)
        maybeMolecule = Validated.molecule
            [ Validated.atom
                ChemicalSymbol.C (Position.position 0.0 0.0 0.0)
            , Validated.atom
                ChemicalSymbol.H (Position.position 1.0 0.0 0.0)
            , Validated.atom
                ChemicalSymbol.H (Position.position (-1.0) 0.0 0.0)
            ]
            [ Validated.bond 1 0 1
            , Validated.bond 1 0 2
            ]


---- VIEW ----


type ActionCreators a r =
    { updateMoleculePage       :: UpdateMoleculePage -> a
    , selectMolecule           :: RowIndex -> Molecule -> a
    , initMongoConfigurator    :: Config.MongoConfigurator -> a
    , initSortedAll            :: Config.SortedAll -> a
    , initBuildingBlockBrowser :: Config.BuildingBlockBrowser -> a
    , setTwoDViewer            :: Boolean -> a
    , setThreeDViewer          :: Boolean -> a
    | r
    }

props :: forall a r.  ActionCreators a r -> Model -> Props a

props actionCreators model@{ twoDViewer: true, threeDViewer: true } =
    Props.AllViewers $
        { sortButton: SortButton.props
            model.valueCollections
            (setSorted actionCreators model)
            (setUnsorted actionCreators model)

        , moleculeTable:
            { columns: model.columns
            , selectedRow: fst selected
            , rows: map Molecule.properties molecules
            , molecules
            , selectMolecule: selectMoleculeProp actionCreators
            , buildingBlockRequests:
                map (buildingBlockRequest actionCreators model) molecules
            }

        , twoDViewerSwitch:
            ViewerSwitch.props
                { setState: actionCreators.setTwoDViewer }
                "2D Viewer"
                model.twoDViewer

        , threeDViewerSwitch:
            ViewerSwitch.props
                { setState: actionCreators.setThreeDViewer }
                "3D Viewer"
                model.threeDViewer

        , twoDViewer: { smiles: Molecule.smiles selectedMolecule }

        , threeDViewer: { meshes: Molecule.meshes selectedMolecule }

        , nextButton:
            { lastPage: lastPage model.pageKind
            , onClick: nextButtonClick actionCreators model
            }

        , backButton:
            { disabled: BackButton.disabled model.pageKind
            , onClick: backButtonClick actionCreators model
            }

        , breadcrumbs:
            { onClick: breadcrumbsClick actionCreators model
            }

        , saveButton: {
            writers: SaveButton.writers selectedMolecule
        }

        , type: "Molecule Browser All Viewers"
        }

  where
    selected = SelectingCollection.selected model.molecules
    selectedMolecule = snd selected
    molecules = SelectingCollection.all model.molecules
    lastPage PageKind.LastComplete = true
    lastPage PageKind.LastIncomplete = true
    lastPage PageKind.OnlyComplete = true
    lastPage PageKind.OnlyIncomplete = true
    lastPage _ = false


props actionCreators model@{ twoDViewer: false, threeDViewer: true } =
    Props.ThreeDViewer $
        { sortButton: SortButton.props
            model.valueCollections
            (setSorted actionCreators model)
            (setUnsorted actionCreators model)

        , moleculeTable:
            { columns: model.columns
            , selectedRow: fst selected
            , rows: map Molecule.properties molecules
            , molecules
            , selectMolecule: selectMoleculeProp actionCreators
            , buildingBlockRequests:
                map (buildingBlockRequest actionCreators model) molecules
            }

        , twoDViewerSwitch:
            ViewerSwitch.props
                { setState: actionCreators.setTwoDViewer }
                "2D Viewer"
                model.twoDViewer

        , threeDViewerSwitch:
            ViewerSwitch.props
                { setState: actionCreators.setThreeDViewer }
                "3D Viewer"
                model.threeDViewer

        , threeDViewer: { meshes: Molecule.meshes selectedMolecule }

        , nextButton:
            { lastPage: lastPage model.pageKind
            , onClick: nextButtonClick actionCreators model
            }

        , backButton:
            { disabled: BackButton.disabled model.pageKind
            , onClick: backButtonClick actionCreators model
            }

        , breadcrumbs:
            { onClick: breadcrumbsClick actionCreators model
            }

        , saveButton: {
            writers: SaveButton.writers selectedMolecule
        }

        , type: "Molecule Browser 3D Viewer"
        }

  where
    selected = SelectingCollection.selected model.molecules
    selectedMolecule = snd selected
    molecules = SelectingCollection.all model.molecules
    lastPage PageKind.LastComplete = true
    lastPage PageKind.LastIncomplete = true
    lastPage PageKind.OnlyComplete = true
    lastPage PageKind.OnlyIncomplete = true
    lastPage _ = false

props actionCreators model@{ twoDViewer: true, threeDViewer: false } =
    Props.TwoDViewer $
        { sortButton: SortButton.props
            model.valueCollections
            (setSorted actionCreators model)
            (setUnsorted actionCreators model)

        , moleculeTable:
            { columns: model.columns
            , selectedRow: fst selected
            , rows: map Molecule.properties molecules
            , molecules
            , selectMolecule: selectMoleculeProp actionCreators
            , buildingBlockRequests:
                map (buildingBlockRequest actionCreators model) molecules
            }

        , twoDViewerSwitch:
            ViewerSwitch.props
                { setState: actionCreators.setTwoDViewer }
                "2D Viewer"
                model.twoDViewer

        , threeDViewerSwitch:
            ViewerSwitch.props
                { setState: actionCreators.setThreeDViewer }
                "3D Viewer"
                model.threeDViewer

        , twoDViewer: { smiles: Molecule.smiles selectedMolecule }

        , nextButton:
            { lastPage: lastPage model.pageKind
            , onClick: nextButtonClick actionCreators model
            }

        , backButton:
            { disabled: BackButton.disabled model.pageKind
            , onClick: backButtonClick actionCreators model
            }

        , breadcrumbs:
            { onClick: breadcrumbsClick actionCreators model
            }

        , saveButton: {
            writers: SaveButton.writers selectedMolecule
        }

        , type: "Molecule Browser 2D Viewer"
        }

  where
    selected = SelectingCollection.selected model.molecules
    selectedMolecule = snd selected
    molecules = SelectingCollection.all model.molecules
    lastPage PageKind.LastComplete = true
    lastPage PageKind.LastIncomplete = true
    lastPage PageKind.OnlyComplete = true
    lastPage PageKind.OnlyIncomplete = true
    lastPage _ = false

props actionCreators model@{ twoDViewer: false, threeDViewer: false } =
    Props.NoViewers $
        { sortButton: SortButton.props
            model.valueCollections
            (setSorted actionCreators model)
            (setUnsorted actionCreators model)

        , moleculeTable:
            { columns: model.columns
            , selectedRow: fst selected
            , rows: map Molecule.properties molecules
            , molecules
            , selectMolecule: selectMoleculeProp actionCreators
            , buildingBlockRequests:
                map (buildingBlockRequest actionCreators model) molecules
            }

        , twoDViewerSwitch:
            ViewerSwitch.props
                { setState: actionCreators.setTwoDViewer }
                "2D Viewer"
                model.twoDViewer

        , threeDViewerSwitch:
            ViewerSwitch.props
                { setState: actionCreators.setThreeDViewer }
                "3D Viewer"
                model.threeDViewer

        , nextButton:
            { lastPage: lastPage model.pageKind
            , onClick: nextButtonClick actionCreators model
            }

        , backButton:
            { disabled: BackButton.disabled model.pageKind
            , onClick: backButtonClick actionCreators model
            }

        , breadcrumbs:
            { onClick: breadcrumbsClick actionCreators model
            }

        , saveButton: {
            writers: SaveButton.writers selectedMolecule
        }

        , type: "Molecule Browser No Viewers"
        }

  where
    selected = SelectingCollection.selected model.molecules
    selectedMolecule = snd selected
    molecules = SelectingCollection.all model.molecules
    lastPage PageKind.LastComplete = true
    lastPage PageKind.LastIncomplete = true
    lastPage PageKind.OnlyComplete = true
    lastPage PageKind.OnlyIncomplete = true
    lastPage _ = false


---


type CollectionName = String


---


type SetSortedActionCreators a r =
    { initSortedAll      :: Config.SortedAll -> a
    | r
    }

setSorted
    :: forall a r
    .  Deferred
    => SetSortedActionCreators a r
    -> Model
    -> DispatchAction a
    -> Snackbar
    -> CollectionName
    -> SortType
    -> Promise Unit

setSorted actionCreators model dispatch snackbar collection sortType
    = catch
        (_setSorted
            actionCreators model dispatch collection sortType
        )
        (Snackbar.errorSnackbar snackbar)

_setSorted
    :: forall a r
    .  Deferred
    => SetSortedActionCreators a r
    -> Model
    -> DispatchAction a
    -> CollectionName
    -> SortType
    -> Promise Unit

_setSorted actionCreators model dispatch collection sortType = do

    result <- SortedRequest.request
        { url: model.url
        , database: model.database
        , moleculeKey: model.moleculeKey
        , moleculeCollection: model.moleculeCollection
        , constructedMoleculeCollection:
            model.constructedMoleculeCollection
        , positionMatrixCollection: model.positionMatrixCollection
        , buildingBlockPositionMatrixCollection:
            model.buildingBlockPositionMatrixCollection
        , pageIndex: 0
        , numEntriesPerPage: model.numEntriesPerPage
        , ignoredCollections: model.ignoredCollections
        , sortedCollection: collection
        , sortType: SortType.toRequest sortType
        }

    let
        (SortedRequest.Result
            { valueCollections, molecules, pageKind }
        ) = result

        payload =
            { url: model.url
            , database: model.database
            , moleculeKey: model.moleculeKey
            , moleculeCollection: model.moleculeCollection
            , constructedMoleculeCollection:
                model.constructedMoleculeCollection
            , positionMatrixCollection: model.positionMatrixCollection
            , buildingBlockPositionMatrixCollection:
                model.buildingBlockPositionMatrixCollection
            , pageIndex: 0
            , numEntriesPerPage: model.numEntriesPerPage
            , ignoredCollections: model.ignoredCollections
            , pageKind: PageKind.fromRequest pageKind
            , valueCollections
            , columns:
                Array.concat [[model.moleculeKey], valueCollections]
            , molecules:
                map (Molecule.molecule' model.moleculeKey) molecules
            , sortedCollection: collection
            , sortType
            , twoDViewer: model.twoDViewer
            , threeDViewer: model.threeDViewer
            }

    pure (unsafePerformEffect
        (runEffectFn1
            dispatch (actionCreators.initSortedAll payload)
        )
    )


---


type SetUnsortedActionCreators a r =
    { updateMoleculePage :: UpdateMoleculePage -> a
    | r
    }

setUnsorted
    :: forall a r1 r2
    .  Deferred
    => SetUnsortedActionCreators a r1
    -> RequestConfig r2
    -> DispatchAction a
    -> Snackbar
    -> Promise Unit

setUnsorted actionCreators model dispatch snackbar
    = catch
        (_setUnsorted actionCreators model dispatch)
        (Snackbar.errorSnackbar snackbar)

_setUnsorted
    :: forall a r1 r2
    .  Deferred
    => SetUnsortedActionCreators a r1
    -> RequestConfig r2
    -> DispatchAction a
    -> Promise Unit

_setUnsorted actionCreators model dispatch = do

    result <- UnsortedRequest.request
        { url: model.url
        , database: model.database
        , moleculeKey: model.moleculeKey
        , moleculeCollection: model.moleculeCollection
        , constructedMoleculeCollection:
            model.constructedMoleculeCollection
        , positionMatrixCollection: model.positionMatrixCollection
        , buildingBlockPositionMatrixCollection:
            model.buildingBlockPositionMatrixCollection
        , pageIndex: 0
        , numEntriesPerPage: model.numEntriesPerPage
        , ignoredCollections: model.ignoredCollections
        }

    let
        (UnsortedRequest.Result
            { valueCollections, molecules, pageKind }
        ) = result

        payload =
            { columns:
                Array.concat [[model.moleculeKey], valueCollections]
            , molecules:
                map (Molecule.molecule' model.moleculeKey) molecules
            , pageIndex: 0
            , pageKind: PageKind.fromRequest pageKind
            , valueCollections
            }

    pure (unsafePerformEffect
        (runEffectFn1
            dispatch
            (actionCreators.updateMoleculePage payload)
        )
    )


---


type RowIndex = Int


type SelectMoleculeActionCreators a r =
    { selectMolecule :: RowIndex -> Molecule -> a
    | r
    }


selectMoleculeProp
    :: forall a r
    .  SelectMoleculeActionCreators a r
    -> DispatchAction a
    -> RowIndex
    -> Molecule
    -> Unit

selectMoleculeProp actionCreators dispatch rowIndex molecule =
    unsafePerformEffect
        (runEffectFn1 dispatch
            (actionCreators.selectMolecule rowIndex molecule)
        )


---


type BuildingBlockRequestActionCreators a r =
    { initBuildingBlockBrowser :: Config.BuildingBlockBrowser -> a
    |r
    }

buildingBlockRequest
    :: forall a r
    .  Deferred
    => BuildingBlockRequestActionCreators a r
    -> Model
    -> Molecule
    -> DispatchAction a
    -> Snackbar
    -> Promise Unit

buildingBlockRequest actionCreators model molecule dispatch snackbar
    = catch
        (_buildingBlockRequest actionCreators model molecule dispatch)
        (Snackbar.errorSnackbar snackbar)

_buildingBlockRequest
    :: forall a r
    .  Deferred
    => BuildingBlockRequestActionCreators a r
    -> Model
    -> Molecule
    -> DispatchAction a
    -> Promise Unit

_buildingBlockRequest actionCreators model molecule dispatch = do
    result <- BBRequest.request
        { url: model.url
        , database: model.database
        , moleculeKey: model.moleculeKey
        , moleculeCollection: model.moleculeCollection
        , constructedMoleculeCollection:
            model.constructedMoleculeCollection
        , positionMatrixCollection:
            model.positionMatrixCollection
        , buildingBlockPositionMatrixCollection:
            model.buildingBlockPositionMatrixCollection
        , valueCollections: model.valueCollections
        , molecule: Molecule.key molecule
        }

    let
        (BBRequest.Result { molecules }) = result

        payload =
            { url: model.url
            , database: model.database
            , moleculeKey: model.moleculeKey
            , moleculeCollection: model.moleculeCollection
            , constructedMoleculeCollection:
                model.constructedMoleculeCollection
            , positionMatrixCollection: model.positionMatrixCollection
            , buildingBlockPositionMatrixCollection:
                model.buildingBlockPositionMatrixCollection
            , ignoredCollections: model.ignoredCollections
            , valueCollections: model.valueCollections
            , columns: model.columns
            , buildingBlocks:
                map (Molecule.molecule' model.moleculeKey) molecules
            , history: []
            , molecule: Molecule.key molecule
            , moleculeBrowser: Config.UnsortedAll model
            , twoDViewer: model.twoDViewer
            , threeDViewer: model.threeDViewer
            }

    pure (unsafePerformEffect
        (runEffectFn1
            dispatch
            (actionCreators.initBuildingBlockBrowser payload)
        )
    )


---


type NextButtonActionCreators a r =
    { updateMoleculePage :: UpdateMoleculePage -> a
    | r
    }


nextButtonClick
    :: forall a r1 r2
    .  Deferred
    => NextButtonActionCreators a r1
    -> RequestConfig r2
    -> DispatchAction a
    -> NextButton.Snackbars
    -> Promise Unit

nextButtonClick actionCreators model dispatch snackbars = catch
    (_nextButtonClick actionCreators model dispatch snackbars.success)
    (NextButton.errorSnackbar snackbars model.pageKind)

_nextButtonClick
    :: forall a r1 r2
    .  Deferred
    => NextButtonActionCreators a r1
    -> RequestConfig r2
    -> DispatchAction a
    -> NextButton.Snackbar
    -> Promise Unit

_nextButtonClick actionCreators model dispatch snackbar = do

    let
        nextPageIndex =
            NextButton.nextPageIndex model.pageKind model.pageIndex

    result <- UnsortedRequest.request
        { url: model.url
        , database: model.database
        , moleculeKey: model.moleculeKey
        , moleculeCollection: model.moleculeCollection
        , constructedMoleculeCollection:
            model.constructedMoleculeCollection
        , positionMatrixCollection: model.positionMatrixCollection
        , buildingBlockPositionMatrixCollection:
            model.buildingBlockPositionMatrixCollection
        , pageIndex: nextPageIndex
        , numEntriesPerPage: model.numEntriesPerPage
        , ignoredCollections: model.ignoredCollections
        }

    let
        (UnsortedRequest.Result
            { valueCollections, molecules, pageKind }
        ) = result

        payload =
            { columns:
                Array.concat [[model.moleculeKey], valueCollections]
            , molecules:
                map (Molecule.molecule' model.moleculeKey) molecules
            , pageIndex: nextPageIndex
            , pageKind: PageKind.fromRequest pageKind
            , valueCollections
            }

    _ <- pure (unsafePerformEffect
        (NextButton.showRefreshedSnackbar
            (nextPageIndex == model.pageIndex)
            snackbar
        )
    )

    pure (unsafePerformEffect
        (runEffectFn1
            dispatch
            (actionCreators.updateMoleculePage payload)
        )
    )


---


type BackButtonActionCreators a r =
    { updateMoleculePage :: UpdateMoleculePage -> a
    | r
    }

backButtonClick
    :: forall a r1 r2
    .  Deferred
    => BackButtonActionCreators a r1
    -> RequestConfig r2
    -> DispatchAction a
    -> BackButton.Snackbars
    -> Promise Unit

backButtonClick actionCreators model dispatch snackbars = catch
    (_backButtonClick actionCreators model dispatch snackbars)
    (BackButton.errorSnackbar snackbars model.pageKind)

_backButtonClick
    :: forall a r1 r2
    .  Deferred
    => BackButtonActionCreators a r1
    -> RequestConfig r2
    -> DispatchAction a
    -> BackButton.Snackbars
    -> Promise Unit

_backButtonClick actionCreators model dispatch snackbar = do
    result <- UnsortedRequest.request
        { url: model.url
        , database: model.database
        , moleculeKey: model.moleculeKey
        , moleculeCollection: model.moleculeCollection
        , constructedMoleculeCollection:
            model.constructedMoleculeCollection
        , positionMatrixCollection: model.positionMatrixCollection
        , buildingBlockPositionMatrixCollection:
            model.buildingBlockPositionMatrixCollection
        , pageIndex
        , numEntriesPerPage: model.numEntriesPerPage
        , ignoredCollections: model.ignoredCollections
        }

    let
        (UnsortedRequest.Result
            { valueCollections, molecules, pageKind }
        ) = result

        payload =
            { columns:
                Array.concat [[model.moleculeKey], valueCollections]
            , molecules:
                map (Molecule.molecule' model.moleculeKey) molecules
            , pageIndex
            , pageKind: PageKind.fromRequest pageKind
            , valueCollections
            }

    pure (unsafePerformEffect
        (runEffectFn1
            dispatch
            (actionCreators.updateMoleculePage payload)
        )
    )
  where
    pageIndex = BackButton.previousPageIndex model.pageIndex


---

type BreadcrumbsActionCreators a r =
    { initMongoConfigurator :: Config.MongoConfigurator -> a
    | r
    }

breadcrumbsClick
    :: forall a r
    .  BreadcrumbsActionCreators a r
    -> Model
    -> DispatchAction a
    -> Unit

breadcrumbsClick actionCreators model dispatch =
    unsafePerformEffect
        (runEffectFn1
            dispatch
            (actionCreators.initMongoConfigurator
                { url: model.url
                , database: model.database
                , moleculeKey: model.moleculeKey
                , moleculeCollection: model.moleculeCollection
                , constructedMoleculeCollection:
                    model.constructedMoleculeCollection
                , positionMatrixCollection:
                    model.positionMatrixCollection
                , buildingBlockPositionMatrixCollection:
                    model.buildingBlockPositionMatrixCollection
                , numEntriesPerPage: model.numEntriesPerPage
                , ignoredCollections: model.ignoredCollections
                , searchKind: SearchKind.UnsortedAll
                , twoDViewer: model.twoDViewer
                , threeDViewer: model.threeDViewer
                }
            )
        )


---- UPDATE ----


type Action =
    { type    :: String
    , payload :: Payload
    }

data Payload
    = UpdateMoleculePage UpdateMoleculePage
    | SelectMolecule RowIndex Molecule
    | SetTwoDViewer Boolean
    | SetThreeDViewer Boolean
    | DoNothing

type UpdateMoleculePage =
    { columns          :: Array String
    , molecules        :: SelectingCollection Molecule
    , pageKind         :: PageKind
    , pageIndex        :: Int
    , valueCollections :: Array String
    }

updateMoleculePage :: UpdateMoleculePage -> Action
updateMoleculePage payload =
    { type: "UPDATE_MOLECULE_PAGE"
    , payload: UpdateMoleculePage payload
    }

selectMolecule :: RowIndex -> Molecule -> Action
selectMolecule rowIndex molecule =
    { type: "SELECT_MOLECULE"
    , payload: SelectMolecule rowIndex molecule
    }

setTwoDViewer :: Boolean -> Action
setTwoDViewer state =
    { type: "SET_2D_VIEWER"
    , payload: SetTwoDViewer state
    }

setThreeDViewer :: Boolean -> Action
setThreeDViewer state =
    { type: "SET_3D_VIEWER"
    , payload: SetThreeDViewer state
    }

doNothing :: Action
doNothing =
    { type: "DO_NOTHING"
    , payload: DoNothing
    }

---


reducer :: Model -> Action -> Model
reducer model action = case action of
    ({ payload: UpdateMoleculePage payload }) ->
        _updateMoleculePage model payload

    ({ payload: SelectMolecule rowIndex molecule }) ->
        _selectMolecule model rowIndex molecule

    ({ payload: SetTwoDViewer state }) ->
        model { twoDViewer = state }

    ({ payload: SetThreeDViewer state }) ->
        model { threeDViewer = state }

    ({ payload: DoNothing }) -> model

---


_updateMoleculePage
    :: forall r
    .  MoleculePage r
    -> UpdateMoleculePage
    -> MoleculePage r

_updateMoleculePage model payload
    = model
        { molecules = payload.molecules
        , columns = payload.columns
        , pageIndex = payload.pageIndex
        , pageKind = payload.pageKind
        , valueCollections = payload.valueCollections
        }


---


_selectMolecule
    :: forall r
    .  Molecules r
    -> RowIndex
    -> Molecule
    -> Molecules r

_selectMolecule model rowIndex molecule
    = model
        { molecules = SelectingCollection.select
            model.molecules
            (Tuple rowIndex molecule)
        }
