module Page.MoleculeBrowser.UnsortedAll
    ( Model
    ) where

import Prelude
import Data.Array as Array
import PageKind (PageKind)
import PageKind as PageKind
import SortType (SortType)
import SortType as SortType
import SelectingCollection (SelectingCollection)
import Molecule (Molecule)
import Molecule as Molecule
import DispatchAction (DispatchAction)
import Page.MoleculeBrowser.SortButton as SortButton
import Effect.Promise (class Deferred, Promise)
import Requests.UnsortedAll as UnsortedRequest
import Requests.SortedAll as SortedRequest
import Effect.Unsafe (unsafePerformEffect)
import Effect.Uncurried (runEffectFn1)


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


---- VIEW ----


type Props a =
    { sortButton    :: SortButton.Props a
    }

type ActionCreators a r =
    { setSorted               :: CollectionName -> SortType -> a
    , setUnsorted             :: a
    , updateMoleculePage      :: UpdateMoleculePage -> a
    | r
    }

props :: forall a r. ActionCreators a r -> Model -> Props a
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

type UpdateMoleculePage =
    { columns          :: Array String
    , molecules        :: SelectingCollection Molecule
    , pageKind         :: PageKind
    , pageIndex        :: Int
    , valueCollections :: Array String
    }


---


reducer :: Model -> Action -> Model
reducer model action = case action of
    ({ payload: UpdateMoleculePage payload }) ->
        updateMoleculePage model payload


---


updateMoleculePage
    :: forall r
    .  MoleculePage r
    -> UpdateMoleculePage
    -> MoleculePage r

updateMoleculePage model payload
    = model
        { molecules = payload.molecules
        , columns = payload.columns
        , pageIndex = payload.pageIndex
        , pageKind = payload.pageKind
        , valueCollections = payload.valueCollections
        }
