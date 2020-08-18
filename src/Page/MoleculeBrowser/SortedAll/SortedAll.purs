module Page.MoleculeBrowser.SortedAll
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
import Effect.Promise (class Deferred, Promise, catch)
import Requests.UnsortedAll as UnsortedRequest
import Requests.SortedAll as SortedRequest
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
import Page.MongoConfigurator.SearchKind as SearchKind
import Config as Config


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
    , sortedCollection                  :: String
    , sortType                          :: SortType
    , pageKind                          :: PageKind
    , valueCollections                  :: Array String
    , columns                           :: Array String
    , molecules                         :: SelectingCollection Molecule
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

type SortedMoleculePage r =
    { columns          :: Array String
    , molecules        :: SelectingCollection Molecule
    , pageIndex        :: Int
    , pageKind         :: PageKind
    , valueCollections :: Array String
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
    , ignoredCollections                    :: Array String
    , pageKind                              :: PageKind
    , sortedCollection                      :: String
    , sortType                              :: SortType
    | r
    }

init :: Config.SortedAll -> Model
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
    , sortedCollection: "numAtoms"
    , sortType: SortType.Ascending
    }
  where
    molecule = Molecule.molecule
        false
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
    { changeSortedCollection  :: ChangeSortedCollection -> a
    , updateMoleculePage      :: UpdateMoleculePage -> a
    , selectMolecule          :: RowIndex -> Molecule -> a
    , initMongoConfigurator   :: Config.MongoConfigurator -> a
    , initUnsortedAll         :: Config.UnsortedAll -> a
    | r
    }

props :: forall a r.  ActionCreators a r -> Model -> Props a
props actionCreators model =
    { sortButton: SortButton.props
        model.valueCollections
        (onSetSorted actionCreators model)
        (onSetUnsorted actionCreators model)

    , moleculeTable:
        { columns: model.columns
        , selectedRow: fst selected
        , rows: map Molecule.properties molecules
        , molecules
        , selectMolecule: selectMoleculeProp actionCreators
        }

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
    , type: "Molecule Browser"
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
    { changeSortedCollection :: ChangeSortedCollection -> a
    | r
    }

onSetSorted
    :: forall a r1 r2
    .  Deferred
    => SetSortedActionCreators a r1
    -> RequestConfig r2
    -> DispatchAction a
    -> CollectionName
    -> SortType
    -> Promise Unit

onSetSorted actionCreators model dispatch collection sortType = do

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
            { columns:
                Array.concat [[model.moleculeKey], valueCollections]
            , molecules:
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
    { initUnsortedAll :: Config.UnsortedAll -> a
    | r
    }

onSetUnsorted
    :: forall a r1 r2
    .  Deferred
    => SetUnsortedActionCreators a r1
    -> RequestConfig r2
    -> DispatchAction a
    -> Promise Unit

onSetUnsorted actionCreators model dispatch = do

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
            }

    pure (unsafePerformEffect
        (runEffectFn1
            dispatch
            (actionCreators.initUnsortedAll payload)
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
        , positionMatrixCollection: model.positionMatrixCollection
        , buildingBlockPositionMatrixCollection:
            model.buildingBlockPositionMatrixCollection
        , pageIndex: nextPageIndex
        , numEntriesPerPage: model.numEntriesPerPage
        , ignoredCollections: model.ignoredCollections
        , sortedCollection: model.sortedCollection
        , sortType: SortType.toRequest model.sortType
        }

    let
        (SortedRequest.Result
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
        , pageIndex
        , numEntriesPerPage: model.numEntriesPerPage
        , ignoredCollections: model.ignoredCollections
        , sortedCollection: model.sortedCollection
        , sortType: SortType.toRequest model.sortType
        }

    let
        (SortedRequest.Result
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
    :: forall a r1 r2
    .  BreadcrumbsActionCreators a r1
    -> RequestConfig r2
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
    | DoNothing

type UpdateMoleculePage =
    { columns          :: Array String
    , molecules        :: SelectingCollection Molecule
    , pageKind         :: PageKind
    , pageIndex        :: Int
    , valueCollections :: Array String
    }

type ChangeSortedCollection =
    { columns          :: Array String
    , molecules        :: SelectingCollection Molecule
    , pageKind         :: PageKind
    , pageIndex        :: Int
    , valueCollections :: Array String
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


---


_changeSortedCollection
    :: forall r
    .  SortedMoleculePage r
    -> ChangeSortedCollection
    -> SortedMoleculePage r

_changeSortedCollection model payload
    = model
        { molecules = payload.molecules
        , columns = payload.columns
        , pageIndex = payload.pageIndex
        , pageKind = payload.pageKind
        , valueCollections = payload.valueCollections
        , sortedCollection = payload.sortedCollection
        , sortType = payload.sortType
        }
