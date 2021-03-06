module Page.MoleculeBrowser.SortedBuildingBlocks
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
    , changeSortedCollection
    , setTwoDViewer
    , setThreeDViewer
    , hideCollection
    , showCollection
    ) where

import Prelude
import Data.HashSet as HashSet
import Data.HashSet (HashSet)
import Data.Array as Array
import Data.String as String
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
import Page.ColumnButton as ColumnButton
import Page.ViewerSwitch as ViewerSwitch
import Page.SaveButton as SaveButton
import Effect.Promise (class Deferred, Promise, catch)
import Requests.UnsortedBuildingBlocks as UnsortedRequest
import Requests.SortedBuildingBlocks as SortedRequest
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
    , ignoredCollections                :: HashSet String
    , sortedCollection                  :: String
    , sortType                          :: SortType
    , pageKind                          :: PageKind
    , valueCollections                  :: HashSet String
    , molecules                         :: SelectingCollection Molecule
    , twoDViewer                        :: Boolean
    , threeDViewer                      :: Boolean
    }

type Molecules r =
    { molecules :: SelectingCollection Molecule
    | r
    }

type MoleculePage r =
    { molecules        :: SelectingCollection Molecule
    , pageIndex        :: Int
    , pageKind         :: PageKind
    , valueCollections :: HashSet String
    | r
    }

type SortedMoleculePage r =
    { molecules        :: SelectingCollection Molecule
    , pageIndex        :: Int
    , pageKind         :: PageKind
    , valueCollections :: HashSet String
    , sortedCollection :: String
    , sortType         :: SortType
    | r
    }

type SortConfig r =
    { sortedCollection :: String
    , sortType         :: SortType
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
    , ignoredCollections                    :: HashSet String
    , pageKind                              :: PageKind
    , sortedCollection                      :: String
    , sortType                              :: SortType
    | r
    }

init :: Config.SortedBuildingBlocks -> Model
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
        "position_matrices"
    , pageIndex: 0
    , numEntriesPerPage: 34
    , ignoredCollections: HashSet.empty
    , pageKind: PageKind.First
    , valueCollections: HashSet.fromArray ["numAtoms"]
    , molecules: SelectingCollection.selectingCollection [] molecule []
    , sortedCollection: "numAtoms"
    , sortType: SortType.Ascending
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
    { changeSortedCollection     :: ChangeSortedCollection -> a
    , updateMoleculePage         :: UpdateMoleculePage -> a
    , selectMolecule             :: RowIndex -> Molecule -> a
    , initMongoConfigurator      :: Config.MongoConfigurator -> a
    , initUnsortedBuildingBlocks :: Config.UnsortedBuildingBlocks -> a
    , initBuildingBlockBrowser   :: Config.BuildingBlockBrowser -> a
    , setTwoDViewer              :: Boolean -> a
    , setThreeDViewer            :: Boolean -> a
    , hideCollection             :: String -> a
    , showCollection             :: String -> a
    | r
    }

props :: forall a r.  ActionCreators a r -> Model -> Props a

props actionCreators model@{ twoDViewer: true, threeDViewer: true } =
    Props.AllViewers $
        { sortButton:
            SortButton.props
                visibleValueCollections
                (onSetSorted actionCreators model)
                (onSetUnsorted actionCreators model)

        , moleculeTable:
            { columns
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

        , saveButton:
            { writers: SaveButton.writers selectedMolecule
            , defaultFilename: Molecule.key selectedMolecule
            }

        , columnButton:
            ColumnButton.props
                actionCreators
                model.ignoredCollections
                model.valueCollections

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

    visibleValueCollections =
        Array.sortWith String.toLower $
        Array.fromFoldable
            (HashSet.difference
                model.valueCollections
                model.ignoredCollections
            )

    columns = Array.cons model.moleculeKey visibleValueCollections

props actionCreators model@{ twoDViewer: false, threeDViewer: true } =
    Props.ThreeDViewer $
        { sortButton:
            SortButton.props
                visibleValueCollections
                (onSetSorted actionCreators model)
                (onSetUnsorted actionCreators model)

        , moleculeTable:
            { columns
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

        , saveButton:
            { writers: SaveButton.writers selectedMolecule
            , defaultFilename: Molecule.key selectedMolecule
            }

        , columnButton:
            ColumnButton.props
                actionCreators
                model.ignoredCollections
                model.valueCollections

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

    visibleValueCollections =
        Array.sortWith String.toLower $
        Array.fromFoldable
            (HashSet.difference
                model.valueCollections
                model.ignoredCollections
            )

    columns = Array.cons model.moleculeKey visibleValueCollections

props actionCreators model@{ twoDViewer: true, threeDViewer: false } =
    Props.TwoDViewer $
        { sortButton:
            SortButton.props
                visibleValueCollections
                (onSetSorted actionCreators model)
                (onSetUnsorted actionCreators model)

        , moleculeTable:
            { columns
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

        , saveButton:
            { writers: SaveButton.writers selectedMolecule
            , defaultFilename: Molecule.key selectedMolecule
            }

        , columnButton:
            ColumnButton.props
                actionCreators
                model.ignoredCollections
                model.valueCollections

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

    visibleValueCollections =
        Array.sortWith String.toLower $
        Array.fromFoldable
            (HashSet.difference
                model.valueCollections
                model.ignoredCollections
            )

    columns = Array.cons model.moleculeKey visibleValueCollections

props actionCreators model@{ twoDViewer: false, threeDViewer: false } =
    Props.NoViewers $
        { sortButton:
            SortButton.props
                visibleValueCollections
                (onSetSorted actionCreators model)
                (onSetUnsorted actionCreators model)

        , moleculeTable:
            { columns
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

        , saveButton:
            { writers: SaveButton.writers selectedMolecule
            , defaultFilename: Molecule.key selectedMolecule
            }

        , columnButton:
            ColumnButton.props
                actionCreators
                model.ignoredCollections
                model.valueCollections

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

    visibleValueCollections =
        Array.sortWith String.toLower $
        Array.fromFoldable
            (HashSet.difference
                model.valueCollections
                model.ignoredCollections
            )

    columns = Array.cons model.moleculeKey visibleValueCollections

---


type CollectionName = String


---


type SetSortedActionCreators a r =
    { changeSortedCollection :: ChangeSortedCollection -> a
    | r
    }

onSetSorted
    :: forall a r1 r2
    .  Deferred
    => SetSortedActionCreators a r1
    -> RequestConfig r2
    -> DispatchAction a
    -> Snackbar
    -> CollectionName
    -> SortType
    -> Promise Unit

onSetSorted actionCreators model dispatch snackbar collection sortType
    = catch
        (_onSetSorted
            actionCreators model dispatch collection sortType
        )
        (Snackbar.errorSnackbar snackbar)

_onSetSorted
    :: forall a r1 r2
    .  Deferred
    => SetSortedActionCreators a r1
    -> RequestConfig r2
    -> DispatchAction a
    -> CollectionName
    -> SortType
    -> Promise Unit

_onSetSorted actionCreators model dispatch collection sortType = do

    result <- SortedRequest.request
        { url: model.url
        , database: model.database
        , moleculeKey: model.moleculeKey
        , moleculeCollection: model.moleculeCollection
        , constructedMoleculeCollection:
            model.constructedMoleculeCollection
        , positionMatrixCollection:
            model.buildingBlockPositionMatrixCollection
        , pageIndex: 0
        , numEntriesPerPage: model.numEntriesPerPage
        , ignoredCollections: HashSet.empty
        , sortedCollection: collection
        , sortType: SortType.toRequest sortType
        }

    let
        (SortedRequest.Result
            { valueCollections, molecules, pageKind }
        ) = result

        payload =
            { molecules:
                map (Molecule.molecule' model.moleculeKey) molecules
            , pageIndex: 0
            , pageKind: PageKind.fromRequest pageKind
            , valueCollections
            , sortedCollection: collection
            , sortType
            }

    pure (unsafePerformEffect
        (runEffectFn1
            dispatch (actionCreators.changeSortedCollection payload)
        )
    )


---


type SetUnsortedActionCreators a r =
    { initUnsortedBuildingBlocks :: Config.UnsortedBuildingBlocks -> a
    | r
    }

onSetUnsorted
    :: forall a r
    .  Deferred
    => SetUnsortedActionCreators a r
    -> Model
    -> DispatchAction a
    -> Snackbar
    -> Promise Unit

onSetUnsorted actionCreators model dispatch snackbar
    = catch
        (_onSetUnsorted actionCreators model dispatch)
        (Snackbar.errorSnackbar snackbar)

_onSetUnsorted
    :: forall a r
    .  Deferred
    => SetUnsortedActionCreators a r
    -> Model
    -> DispatchAction a
    -> Promise Unit

_onSetUnsorted actionCreators model dispatch = do

    result <- UnsortedRequest.request
        { url: model.url
        , database: model.database
        , moleculeKey: model.moleculeKey
        , moleculeCollection: model.moleculeCollection
        , constructedMoleculeCollection:
            model.constructedMoleculeCollection
        , positionMatrixCollection:
            model.buildingBlockPositionMatrixCollection
        , pageIndex: 0
        , numEntriesPerPage: model.numEntriesPerPage
        , ignoredCollections: HashSet.empty
        }

    let
        (UnsortedRequest.Result
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
            , molecules:
                map (Molecule.molecule' model.moleculeKey) molecules
            , twoDViewer: model.twoDViewer
            , threeDViewer: model.threeDViewer
            }

    pure (unsafePerformEffect
        (runEffectFn1
            dispatch
            (actionCreators.initUnsortedBuildingBlocks payload)
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
            , buildingBlocks:
                map (Molecule.molecule' model.moleculeKey) molecules
            , history: []
            , molecule: Molecule.key molecule
            , moleculeBrowser: Config.SortedBuildingBlocks model
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

    result <- SortedRequest.request
        { url: model.url
        , database: model.database
        , moleculeKey: model.moleculeKey
        , moleculeCollection: model.moleculeCollection
        , constructedMoleculeCollection:
            model.constructedMoleculeCollection
        , positionMatrixCollection:
            model.buildingBlockPositionMatrixCollection
        , pageIndex: nextPageIndex
        , numEntriesPerPage: model.numEntriesPerPage
        , ignoredCollections: HashSet.empty
        , sortedCollection: model.sortedCollection
        , sortType: SortType.toRequest model.sortType
        }

    let
        (SortedRequest.Result
            { valueCollections, molecules, pageKind }
        ) = result

        payload =
            { molecules:
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
    result <- SortedRequest.request
        { url: model.url
        , database: model.database
        , moleculeKey: model.moleculeKey
        , moleculeCollection: model.moleculeCollection
        , constructedMoleculeCollection:
            model.constructedMoleculeCollection
        , positionMatrixCollection:
            model.buildingBlockPositionMatrixCollection
        , pageIndex
        , numEntriesPerPage: model.numEntriesPerPage
        , ignoredCollections: HashSet.empty
        , sortedCollection: model.sortedCollection
        , sortType: SortType.toRequest model.sortType
        }

    let
        (SortedRequest.Result
            { valueCollections, molecules, pageKind }
        ) = result

        payload =
            { molecules:
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
                , searchKind: SearchKind.UnsortedBuildingBlocks
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
    | ChangeSortedCollection ChangeSortedCollection
    | SetTwoDViewer Boolean
    | SetThreeDViewer Boolean
    | HideCollection String
    | ShowCollection String
    | DoNothing

type UpdateMoleculePage =
    { molecules        :: SelectingCollection Molecule
    , pageKind         :: PageKind
    , pageIndex        :: Int
    , valueCollections :: HashSet String
    }

type ChangeSortedCollection =
    { molecules        :: SelectingCollection Molecule
    , pageKind         :: PageKind
    , pageIndex        :: Int
    , valueCollections :: HashSet String
    , sortedCollection :: String
    , sortType         :: SortType
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

changeSortedCollection :: ChangeSortedCollection -> Action
changeSortedCollection payload =
    { type: "CHANGE_SORTED_COLLECTION"
    , payload: ChangeSortedCollection payload
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

hideCollection :: String -> Action
hideCollection collection =
    { type: "HIDE_COLLECTION"
    , payload: HideCollection collection
    }

showCollection :: String -> Action
showCollection collection =
    { type: "SHOW_COLLECTION"
    , payload: ShowCollection collection
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

    ({ payload: ChangeSortedCollection payload }) ->
        _changeSortedCollection model payload

    ({ payload: SetTwoDViewer state }) ->
        model { twoDViewer = state }

    ({ payload: SetThreeDViewer state }) ->
        model { threeDViewer = state }

    ({ payload: HideCollection collection }) ->
        _hideCollection model collection

    ({ payload: ShowCollection collection }) ->
        _showCollection model collection

    ({ payload: DoNothing }) -> model

---

type IgnoredCollectionsPage r =
    { ignoredCollections :: HashSet String
    | r
    }


_hideCollection
    :: forall r
    .  IgnoredCollectionsPage r
    -> String
    -> IgnoredCollectionsPage r

_hideCollection model@{ ignoredCollections } collection =
    model
        { ignoredCollections =
            HashSet.insert collection ignoredCollections
        }

_showCollection
    :: forall r
    .  IgnoredCollectionsPage r
    -> String
    -> IgnoredCollectionsPage r

_showCollection model@{ ignoredCollections } collection =
    model
        { ignoredCollections =
            HashSet.delete collection ignoredCollections
        }


_updateMoleculePage
    :: forall r
    .  MoleculePage r
    -> UpdateMoleculePage
    -> MoleculePage r

_updateMoleculePage model payload
    = model
        { molecules = payload.molecules
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


---


_changeSortedCollection
    :: forall r
    .  SortedMoleculePage r
    -> ChangeSortedCollection
    -> SortedMoleculePage r

_changeSortedCollection model payload
    = model
        { molecules = payload.molecules
        , pageIndex = payload.pageIndex
        , pageKind = payload.pageKind
        , valueCollections = payload.valueCollections
        , sortedCollection = payload.sortedCollection
        , sortType = payload.sortType
        }
