module Page.BuildingBlockBrowser
    ( Model
    , Action
    , Payload
    , Props
    , BreadcrumbsProps
    , ActionCreators
    , UpdateMoleculePage
    , RowIndex
    , init
    , props
    , reducer
    , updateMoleculePage
    , selectBuildingBlock
    , setTwoDViewer
    , setThreeDViewer
    ) where

import Prelude
import Config as Config
import Config (MoleculeBrowser (..))
import Molecule (Molecule, MoleculeKeyValue)
import Molecule as Molecule
import SelectingCollection (SelectingCollection)
import SelectingCollection as SelectingCollection
import Data.Array as Array
import Data.Array ((..), length)
import Data.Tuple (Tuple (Tuple), fst, snd)
import DispatchAction (DispatchAction)
import Page.MoleculeTable as MoleculeTable
import Page.TwoDViewer as TwoDViewer
import Page.ThreeDViewer as ThreeDViewer
import Effect.Unsafe (unsafePerformEffect)
import Effect.Uncurried (runEffectFn1)
import Effect.Promise (class Deferred, Promise, catch)
import Requests.BuildingBlocks as BBRequest
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
    , ignoredCollections                :: Array String
    , valueCollections                  :: Array String
    , columns                           :: Array String
    , buildingBlocks                    :: SelectingCollection Molecule
    , history                           :: Array MoleculeKeyValue
    , molecule                          :: MoleculeKeyValue
    , moleculeBrowser                   :: Config.MoleculeBrowser
    , twoDViewer                        :: Boolean
    , threeDViewer                      :: Boolean
    }

type BuildingBlocks r =
    { buildingBlocks :: SelectingCollection Molecule
    | r
    }

type MoleculePage r =
    { buildingBlocks :: SelectingCollection Molecule
    , molecule       :: MoleculeKeyValue
    , history        :: Array MoleculeKeyValue
    | r
    }


init :: Config.BuildingBlockBrowser -> Model
init config = config


---- VIEW ----


data Props a
    = NoViewers (NoViewers a)
    | TwoDViewer (TwoDViewer a)
    | ThreeDViewer (ThreeDViewer a)
    | AllViewers (AllViewers a)

type NoViewers a =
    { moleculeTable      :: MoleculeTable.Props a
    , breadcrumbs        :: BreadcrumbsProps a
    , twoDViewerSwitch   :: DispatchAction a -> Boolean -> Unit
    , threeDViewerSwitch :: DispatchAction a -> Boolean -> Unit
    , type               :: String
    }

type TwoDViewer a =
    { moleculeTable      :: MoleculeTable.Props a
    , twoDViewer         :: TwoDViewer.Props
    , breadcrumbs        :: BreadcrumbsProps a
    , twoDViewerSwitch   :: DispatchAction a -> Boolean -> Unit
    , threeDViewerSwitch :: DispatchAction a -> Boolean -> Unit
    , type               :: String
    }

type ThreeDViewer a =
    { moleculeTable      :: MoleculeTable.Props a
    , threeDViewer       :: ThreeDViewer.Props
    , breadcrumbs        :: BreadcrumbsProps a
    , twoDViewerSwitch   :: DispatchAction a -> Boolean -> Unit
    , threeDViewerSwitch :: DispatchAction a -> Boolean -> Unit
    , type               :: String
    }

type AllViewers a =
    { moleculeTable      :: MoleculeTable.Props a
    , twoDViewer         :: TwoDViewer.Props
    , threeDViewer       :: ThreeDViewer.Props
    , breadcrumbs        :: BreadcrumbsProps a
    , twoDViewerSwitch   :: DispatchAction a -> Boolean -> Unit
    , threeDViewerSwitch :: DispatchAction a -> Boolean -> Unit
    , type               :: String
    }


type BreadcrumbsProps a =
    { mongoDbClick :: DispatchAction a -> Unit
    , resultsClick :: DispatchAction a -> Unit
    , historyClick
        :: Deferred
        => Array (DispatchAction a -> Snackbar -> Promise Unit)
    }

type ActionCreators a r =
    { updateMoleculePage         :: UpdateMoleculePage -> a
    , selectBuildingBlock        :: RowIndex -> Molecule -> a
    , initMongoConfigurator      :: Config.MongoConfigurator -> a
    , initSortedAll              :: Config.SortedAll -> a
    , initSortedBuildingBlocks   :: Config.SortedBuildingBlocks -> a
    , initSortedConstructedMolecules
        :: Config.SortedConstructedMolecules -> a
    , initUnsortedAll            :: Config.UnsortedAll -> a
    , initUnsortedBuildingBlocks :: Config.UnsortedBuildingBlocks -> a
    , initUnsortedConstructedMolecules
        :: Config.UnsortedConstructedMolecules -> a
    , setTwoDViewer              :: Boolean -> a
    , setThreeDViewer            :: Boolean -> a
    | r
    }

props :: forall a r. ActionCreators a r -> Model -> Props a

props actionCreators model@{ twoDViewer: true, threeDViewer: true }  =
    AllViewers $
        { moleculeTable:
            { columns: model.columns
            , selectedRow: fst selected
            , rows: map Molecule.properties molecules
            , molecules
            , selectMolecule: selectMoleculeProp actionCreators
            , buildingBlockRequests:
                map (buildingBlockRequest actionCreators model) molecules
            }

        , twoDViewerSwitch: twoDViewerSwitch actionCreators
        , threeDViewerSwitch: threeDViewerSwitch actionCreators
        , twoDViewer: { smiles: Molecule.smiles selectedMolecule }
        , threeDViewer: { meshes: Molecule.meshes selectedMolecule }
        , breadcrumbs:
            { mongoDbClick: mongoDbClick actionCreators model
            , resultsClick: resultsClick actionCreators model
            , historyClick:
                Array.zipWith
                    (historyClick actionCreators model)
                    (0 .. (length model.history-1))
                    model.history
            }
        , type: "Building Block Browser All Viewers"
        }

  where

    selected = SelectingCollection.selected model.buildingBlocks
    selectedMolecule = snd selected
    molecules = SelectingCollection.all model.buildingBlocks

props actionCreators model@{ twoDViewer: false, threeDViewer: true }  =
    ThreeDViewer $
        { moleculeTable:
            { columns: model.columns
            , selectedRow: fst selected
            , rows: map Molecule.properties molecules
            , molecules
            , selectMolecule: selectMoleculeProp actionCreators
            , buildingBlockRequests:
                map (buildingBlockRequest actionCreators model) molecules
            }

        , twoDViewerSwitch: twoDViewerSwitch actionCreators
        , threeDViewerSwitch: threeDViewerSwitch actionCreators
        , threeDViewer: { meshes: Molecule.meshes selectedMolecule }
        , breadcrumbs:
            { mongoDbClick: mongoDbClick actionCreators model
            , resultsClick: resultsClick actionCreators model
            , historyClick:
                Array.zipWith
                    (historyClick actionCreators model)
                    (0 .. (length model.history-1))
                    model.history
            }
        , type: "Building Block Browser 3D Viewer"
        }

  where

    selected = SelectingCollection.selected model.buildingBlocks
    selectedMolecule = snd selected
    molecules = SelectingCollection.all model.buildingBlocks

props actionCreators model@{ twoDViewer: true, threeDViewer: false }  =
    TwoDViewer $
        { moleculeTable:
            { columns: model.columns
            , selectedRow: fst selected
            , rows: map Molecule.properties molecules
            , molecules
            , selectMolecule: selectMoleculeProp actionCreators
            , buildingBlockRequests:
                map (buildingBlockRequest actionCreators model) molecules
            }

        , twoDViewerSwitch: twoDViewerSwitch actionCreators
        , threeDViewerSwitch: threeDViewerSwitch actionCreators
        , twoDViewer: { smiles: Molecule.smiles selectedMolecule }
        , breadcrumbs:
            { mongoDbClick: mongoDbClick actionCreators model
            , resultsClick: resultsClick actionCreators model
            , historyClick:
                Array.zipWith
                    (historyClick actionCreators model)
                    (0 .. (length model.history-1))
                    model.history
            }
        , type: "Building Block Browser 2D Viewer"
        }

  where

    selected = SelectingCollection.selected model.buildingBlocks
    selectedMolecule = snd selected
    molecules = SelectingCollection.all model.buildingBlocks

props actionCreators model@{ twoDViewer: false, threeDViewer: false } =
    NoViewers $
        { moleculeTable:
            { columns: model.columns
            , selectedRow: fst selected
            , rows: map Molecule.properties molecules
            , molecules
            , selectMolecule: selectMoleculeProp actionCreators
            , buildingBlockRequests:
                map (buildingBlockRequest actionCreators model) molecules
            }

        , twoDViewerSwitch: twoDViewerSwitch actionCreators
        , threeDViewerSwitch: threeDViewerSwitch actionCreators
        , breadcrumbs:
            { mongoDbClick: mongoDbClick actionCreators model
            , resultsClick: resultsClick actionCreators model
            , historyClick:
                Array.zipWith
                    (historyClick actionCreators model)
                    (0 .. (length model.history-1))
                    model.history
            }
        , type: "Building Block Browser No Viewers"
        }

  where

    selected = SelectingCollection.selected model.buildingBlocks
    selectedMolecule = snd selected
    molecules = SelectingCollection.all model.buildingBlocks

---


type RowIndex = Int


type SelectMoleculeActionCreators a r =
    { selectBuildingBlock :: RowIndex -> Molecule -> a
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
            (actionCreators.selectBuildingBlock rowIndex molecule)
        )


---


type BuildingBlockRequestActionCreators a r =
    { updateMoleculePage :: UpdateMoleculePage -> a
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
            { buildingBlocks:
                map (Molecule.molecule' model.moleculeKey) molecules
            , molecule: Molecule.key molecule
            , history: Array.concat [model.history, [model.molecule]]
            }

    pure (unsafePerformEffect
        (runEffectFn1
            dispatch
            (actionCreators.updateMoleculePage payload)
        )
    )


---

type MongoClickActionCreators a r =
    { initMongoConfigurator :: Config.MongoConfigurator -> a
    | r
    }

mongoDbClick
    :: forall a r
    .  MongoClickActionCreators a r
    -> Model
    -> DispatchAction a
    -> Unit

mongoDbClick actionCreators model dispatch
    = unsafePerformEffect
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
                , numEntriesPerPage:
                    Config.numEntriesPerPage model.moleculeBrowser
                , ignoredCollections: model.ignoredCollections
                , searchKind:
                    Config.searchKind model.moleculeBrowser
                , twoDViewer: model.twoDViewer
                , threeDViewer: model.threeDViewer
                }
            )
        )


---

type ResultsClickActionCreators a r =
    { initUnsortedAll            :: Config.UnsortedAll -> a
    , initUnsortedBuildingBlocks :: Config.UnsortedBuildingBlocks -> a

    , initUnsortedConstructedMolecules
        :: Config.UnsortedConstructedMolecules -> a

    , initSortedAll              :: Config.SortedAll -> a
    , initSortedBuildingBlocks   :: Config.SortedBuildingBlocks -> a

    , initSortedConstructedMolecules
        :: Config.SortedConstructedMolecules -> a

    | r
    }

resultsClick
    :: forall a r
    .  ResultsClickActionCreators a r
    -> Model
    -> DispatchAction a
    -> Unit

resultsClick actionCreators model dispatch
    = case model.moleculeBrowser of
        UnsortedAll config -> unsafePerformEffect
            (runEffectFn1
                dispatch
                (actionCreators.initUnsortedAll config)
            )
        UnsortedBuildingBlocks config -> unsafePerformEffect
            (runEffectFn1
                dispatch
                (actionCreators.initUnsortedBuildingBlocks config)
            )
        UnsortedConstructedMolecules config -> unsafePerformEffect
            (runEffectFn1
                dispatch
                (actionCreators.initUnsortedConstructedMolecules
                    config
                )
            )
        SortedAll config -> unsafePerformEffect
            (runEffectFn1
                dispatch
                (actionCreators.initSortedAll config)
            )
        SortedBuildingBlocks config -> unsafePerformEffect
            (runEffectFn1
                dispatch
                (actionCreators.initSortedBuildingBlocks config)
            )
        SortedConstructedMolecules config -> unsafePerformEffect
            (runEffectFn1
                dispatch
                (actionCreators.initSortedConstructedMolecules config)
            )


---


type HistoryIndex = Int

type HistoryClickActionCreators a r =
    { updateMoleculePage :: UpdateMoleculePage -> a
    | r
    }

historyClick
    :: forall a r
    .  Deferred
    => HistoryClickActionCreators a r
    -> Model
    -> HistoryIndex
    -> MoleculeKeyValue
    -> DispatchAction a
    -> Snackbar
    -> Promise Unit

historyClick
    actionCreators model historyIndex molecule dispatch snackbar
        = catch
            (_historyClick
                actionCreators model historyIndex molecule dispatch
            )
            (Snackbar.errorSnackbar snackbar)

_historyClick
    :: forall a r
    .  Deferred
    => HistoryClickActionCreators a r
    -> Model
    -> HistoryIndex
    -> MoleculeKeyValue
    -> DispatchAction a
    -> Promise Unit

_historyClick actionCreators model historyIndex molecule dispatch = do
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
        , molecule
        }

    let
        (BBRequest.Result { molecules }) = result

    pure (unsafePerformEffect
        (runEffectFn1
            dispatch
            (actionCreators.updateMoleculePage
                { buildingBlocks:
                    map
                        (Molecule.molecule' model.moleculeKey)
                        molecules
                , molecule
                , history: Array.slice 0 historyIndex model.history
                }
            )
        )
    )


---


type TwoDViewerSwitchActionCreators a r =
    { setTwoDViewer :: Boolean -> a
    | r
    }

twoDViewerSwitch
    :: forall a r
    .  TwoDViewerSwitchActionCreators a r
    -> DispatchAction a
    -> Boolean
    -> Unit

twoDViewerSwitch actionCreators dispatch state =
    unsafePerformEffect
        (runEffectFn1
            dispatch
            (actionCreators.setTwoDViewer state)
        )


---

type ThreeDViewerSwitchActionCreators a r =
    { setThreeDViewer :: Boolean -> a
    | r
    }

threeDViewerSwitch
    :: forall a r
    .  ThreeDViewerSwitchActionCreators a r
    -> DispatchAction a
    -> Boolean
    -> Unit

threeDViewerSwitch actionCreators dispatch state =
    unsafePerformEffect
        (runEffectFn1
            dispatch
            (actionCreators.setThreeDViewer state)
        )


---- UPDATE ----


type Action =
    { type    :: String
    , payload :: Payload
    }

data Payload
    = UpdateMoleculePage UpdateMoleculePage
    | SelectBuildingBlock RowIndex Molecule
    | SetTwoDViewer Boolean
    | SetThreeDViewer Boolean
    | DoNothing

type UpdateMoleculePage =
    { buildingBlocks :: SelectingCollection Molecule
    , molecule       :: MoleculeKeyValue
    , history        :: Array MoleculeKeyValue
    }

updateMoleculePage :: UpdateMoleculePage -> Action
updateMoleculePage payload =
    { type: "UPDATE_MOLECULE_PAGE"
    , payload: UpdateMoleculePage payload
    }

selectBuildingBlock :: RowIndex -> Molecule -> Action
selectBuildingBlock rowIndex molecule =
    { type: "SELECT_BUILDING_BLOCK"
    , payload: SelectBuildingBlock rowIndex molecule
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

    ({ payload: SelectBuildingBlock rowIndex molecule }) ->
        _selectBuildingBlock model rowIndex molecule

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
        { buildingBlocks = payload.buildingBlocks
        , molecule = payload.molecule
        , history = payload.history
        }


---


_selectBuildingBlock
    :: forall r
    .  BuildingBlocks r
    -> RowIndex
    -> Molecule
    -> BuildingBlocks r

_selectBuildingBlock model rowIndex molecule
    = model
        { buildingBlocks = SelectingCollection.select
            model.buildingBlocks
            (Tuple rowIndex molecule)
        }
