module Page.BuildingBlockBrowser
    ( Model
    , BrowserConfig
    ) where

import Config as Config
import Molecule (Molecule, MoleculeKeyValue)
import SelectingCollection (SelectingCollection)
import SelectingCollection as SelectingCollection
import Data.Array as Array
import Data.Tuple (Tuple (Tuple))


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
    {
    }

type ActionCreators a r =
    {
    | r
    }

props :: forall a r. ActionCreators a r -> Model -> Props a
props actionCreators model = {}



---- UPDATE ----


type RowIndex = Int
type Distance = Int


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
