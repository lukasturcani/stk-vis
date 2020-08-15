module Page.MoleculeBrowser.UnsortedAll
    ( Model
    , Action
    , Payload
    , reducer
    , debugInit
    , props
    , updateMoleculePage
    , doNothing
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
import Effect.Promise (class Deferred, Promise)
import Requests.UnsortedAll as UnsortedRequest
import Requests.SortedAll as SortedRequest
import Effect.Unsafe (unsafePerformEffect)
import Effect.Uncurried (runEffectFn1)
import Partial.Unsafe (unsafePartial)
import Data.Map as Map
import Data.Tuple (Tuple (Tuple))
import Data.Maybe as Maybe
import ValidatedMolecule as Validated
import ValidatedMolecule.Position as Position
import ValidatedMolecule.ChemicalSymbol as ChemicalSymbol
import Page.MoleculeBrowser.Props (Props)


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
    { setSorted               :: CollectionName -> SortType -> a
    , setUnsorted             :: a
    , updateMoleculePage      :: UpdateMoleculePage -> a
    | r
    }

props :: forall a r.  ActionCreators a r -> Model -> Props a
props actionCreators model =
    { sortButton: SortButton.props
        model.valueCollections
        (setSorted actionCreators model)
        (setUnsorted actionCreators model)
    }


---


type CollectionName = String


---


type SetSortedActionCreators a r =
    { setSorted          :: CollectionName -> SortType -> a
    , updateMoleculePage :: UpdateMoleculePage -> a
    | r
    }

setSorted
    :: forall a r1 r2
    .  Deferred
    => SetSortedActionCreators a r1
    -> RequestConfig r2
    -> DispatchAction a
    -> CollectionName
    -> SortType
    -> Promise Unit

setSorted actionCreators model dispatch collection sortType = do

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

    _ <- pure (unsafePerformEffect
        (runEffectFn1
            dispatch
            (actionCreators.setSorted collection sortType)
        )
    )

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
            }

    pure (unsafePerformEffect
        (runEffectFn1
            dispatch (actionCreators.updateMoleculePage payload)
        )
    )


---


type SetUnsortedActionCreators a r =
    { setUnsorted        :: a
    , updateMoleculePage :: UpdateMoleculePage -> a
    | r
    }

setUnsorted
    :: forall a r1 r2
    .  Deferred
    => SetUnsortedActionCreators a r1
    -> RequestConfig r2
    -> DispatchAction a
    -> Promise Unit

setUnsorted actionCreators model dispatch = do

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

    _ <- pure (unsafePerformEffect
        (runEffectFn1 dispatch actionCreators.setUnsorted)
    )

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


---- UPDATE ----


type Action =
    { type    :: String
    , payload :: Payload
    }

data Payload
    = UpdateMoleculePage UpdateMoleculePage
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
