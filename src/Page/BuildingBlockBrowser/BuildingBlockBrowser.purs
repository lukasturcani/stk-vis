module Page.BuildingBlockBrowser
    ( Model
    , Action
    , Payload
    , Props
    , ActionCreators
    , UpdateMoleculePage
    , RowIndex
    , NextBuildingBlocks
    , BrowserConfig
    , props
    , reducer
    , nextBuildingBlocks
    , updateMoleculePage
    , selectBuildingBlock
    ) where

import Prelude
import Config as Config
import Molecule (Molecule, MoleculeKeyValue)
import Molecule as Molecule
import SelectingCollection (SelectingCollection)
import SelectingCollection as SelectingCollection
import Data.Array as Array
import Data.Tuple (Tuple (Tuple), fst, snd)
import DispatchAction (DispatchAction)
import Page.MoleculeBrowser.MoleculeTable as MoleculeTable
import Page.MoleculeBrowser.TwoDViewer as TwoDViewer
import Page.MoleculeBrowser.ThreeDViewer as ThreeDViewer
import Effect.Unsafe (unsafePerformEffect)
import Effect.Uncurried (runEffectFn1)
import Effect.Promise (class Deferred, Promise)
import Requests.BuildingBlocks as BBRequest


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
    , moleculeBrowser                   :: BrowserConfig
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


data BrowserConfig
    = UnsortedAll Config.UnsortedAll
    | UnsortedBuildingBlocks Config.UnsortedBuildingBlocks
    | UnsortedConstructedMolecules Config.UnsortedConstructedMolecules
    | SortedAll Config.SortedAll
    | SortedBuildingBlocks Config.SortedBuildingBlocks
    | SortedConstructedMolecules Config.SortedConstructedMolecules


---- VIEW ----


type Props a =
    { moleculeTable :: MoleculeTable.Props a
    , twoDViewer    :: TwoDViewer.Props
    , threeDViewer  :: ThreeDViewer.Props
    , type          :: String
    }

type ActionCreators a r =
    { updateMoleculePage  :: UpdateMoleculePage -> a
    , selectBuildingBlock :: RowIndex -> Molecule -> a
    , nextBuildingBlocks  :: NextBuildingBlocks -> a
    | r
    }

props :: forall a r. ActionCreators a r -> Model -> Props a
props actionCreators model =
    { moleculeTable:
        { columns: model.columns
        , selectedRow: fst selected
        , rows: map Molecule.properties molecules
        , molecules
        , selectMolecule: selectMoleculeProp actionCreators
        , buildingBlockRequests:
            map (buildingBlockRequest actionCreators model) molecules
        }

    , twoDViewer: { smiles: Molecule.smiles selectedMolecule }
    , threeDViewer: { meshes: Molecule.meshes selectedMolecule }
    , type: "Building Block Browser"
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
    { nextBuildingBlocks :: NextBuildingBlocks -> a
    |r
    }

buildingBlockRequest
    :: forall a r
    .  Deferred
    => BuildingBlockRequestActionCreators a r
    -> Model
    -> Molecule
    -> DispatchAction a
    -> Promise Unit

buildingBlockRequest actionCreators model molecule dispatch = do
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
            }

    pure (unsafePerformEffect
        (runEffectFn1
            dispatch
            (actionCreators.nextBuildingBlocks payload)
        )
    )


---- UPDATE ----


type Action =
    { type    :: String
    , payload :: Payload
    }

data Payload
    = NextBuildingBlocks NextBuildingBlocks
    | UpdateMoleculePage UpdateMoleculePage
    | SelectBuildingBlock RowIndex Molecule
    | DoNothing

type NextBuildingBlocks =
    { buildingBlocks :: SelectingCollection Molecule
    , molecule       :: MoleculeKeyValue
    }

type UpdateMoleculePage =
    { buildingBlocks :: SelectingCollection Molecule
    , molecule       :: MoleculeKeyValue
    , history        :: Array MoleculeKeyValue
    }

nextBuildingBlocks :: NextBuildingBlocks -> Action
nextBuildingBlocks payload =
    { type: "NEXT_BUILDING_BLOCKS"
    , payload: NextBuildingBlocks payload
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

doNothing :: Action
doNothing =
    { type: "DO_NOTHING"
    , payload: DoNothing
    }


---


reducer :: Model -> Action -> Model
reducer model action = case action of
    ({ payload: NextBuildingBlocks payload }) ->
        _nextBuildingBlocks model payload

    ({ payload: UpdateMoleculePage payload }) ->
        _updateMoleculePage model payload

    ({ payload: SelectBuildingBlock rowIndex molecule }) ->
        _selectBuildingBlock model rowIndex molecule

    ({ payload: DoNothing }) -> model

---


_nextBuildingBlocks
    :: forall r
    .  MoleculePage r
    -> NextBuildingBlocks
    -> MoleculePage r

_nextBuildingBlocks model payload
    = model
        { buildingBlocks = payload.buildingBlocks
        , molecule = payload.molecule
        , history =
            Array.concat
                [model.history, [payload.molecule]]
        }


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
