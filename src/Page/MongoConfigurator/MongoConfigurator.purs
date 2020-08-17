module Page.MongoConfigurator
    ( Model
    , Payload
    , init
    , initFromConfig
    , reducer
    , props
    , doNothing
    ) where


import Prelude
import DispatchAction (DispatchAction)
import Effect.Promise (class Deferred, Promise, catch)
import Config as Config
import Effect (Effect)
import Effect.Uncurried (EffectFn1, runEffectFn1)
import Effect.Unsafe (unsafePerformEffect)
import Effect.Exception (Error, message) as Error
import Effect.Class.Console (log)
import Data.Array as Array
import PageKind as PageKind
import Molecule as Molecule
import Page.MongoConfigurator.SearchKind (SearchKind (..))

import Requests.UnsortedAll as AllRequest
import Requests.UnsortedBuildingBlocks as BuildingBlocksRequest
import Requests.UnsortedConstructedMolecules
    as ConstructedMoleculesRequest


---- MODEL ----


type Model =
    { url                                   :: String
    , database                              :: String
    , moleculeKey                           :: String
    , moleculeCollection                    :: String
    , constructedMoleculeCollection         :: String
    , positionMatrixCollection              :: String
    , buildingBlockPositionMatrixCollection :: String
    , numEntriesPerPage                     :: Int
    , ignoredCollections                    :: Array String
    , searchKind                            :: SearchKind
    }


init :: Model
init =
    { url: "mongodb://localhost:27017"
    , database: "stkVis"
    , moleculeKey: "InChIKey"
    , moleculeCollection: "molecules"
    , constructedMoleculeCollection: "constructed_molecules"
    , positionMatrixCollection: "position_matrices"
    , buildingBlockPositionMatrixCollection:
        "position_matrices"
    , numEntriesPerPage: 34
    , ignoredCollections: []
    , searchKind: UnsortedAll
    }

initFromConfig :: Config.MongoConfigurator -> Model
initFromConfig config = config


---- VIEW ----


type Props a =
    { url                                  :: String
    , database                             :: String
    , moleculeKey                          :: String
    , moleculeCollection                   :: String
    , constructedMoleculeCollection        :: String
    , positionMatrixCollection             :: String
    , buildingBlockPositionMatrixCollection :: String
    , numEntriesPerPage                    :: Int
    , ignoredCollections                   :: Array String
    , selectBuildingBlocks                 :: Boolean
    , selectConstructedMolecules           :: Boolean
    , getMoleculesButton                   :: GetMoleculesButtonProps a
    }

type GetMoleculesButtonProps a =
    { onClick
        :: Deferred
        => DispatchAction a
        -> Snackbars
        -> MongoData
        -> Promise Unit
    }

type Snackbars =
    { success :: Snackbar
    , error   :: Snackbar
    }

type Snackbar =
    { setOpen    :: EffectFn1 Boolean Unit
    , setMessage :: EffectFn1 String Unit
    }

type MongoData =
    { url                                   :: String
    , database                              :: String
    , moleculeKey                           :: String
    , moleculeCollection                    :: String
    , constructedMoleculeCollection         :: String
    , positionMatrixCollection              :: String
    , buildingBlockPositionMatrixCollection :: String
    , numEntriesPerPage                     :: Int
    , selectBuildingBlocks                  :: Boolean
    , selectConstructedMolecules            :: Boolean
    }

type ActionCreators a r =
    { initUnsortedAll :: Config.UnsortedAll -> a
    , initUnsortedBuildingBlocks :: Config.UnsortedBuildingBlocks -> a
    , initUnsortedConstructedMolecules
        :: Config.UnsortedConstructedMolecules
        -> a
    | r
    }

props :: forall a r. ActionCreators a r -> Model -> Props a
props actionCreators model =
    { url: model.url
    , database: model.database
    , moleculeKey: model.moleculeKey
    , moleculeCollection: model.moleculeCollection
    , constructedMoleculeCollection:
        model.constructedMoleculeCollection
    , positionMatrixCollection: model.positionMatrixCollection
    , buildingBlockPositionMatrixCollection:
        model.buildingBlockPositionMatrixCollection
    , numEntriesPerPage: model.numEntriesPerPage
    , ignoredCollections: model.ignoredCollections
    , selectBuildingBlocks:
        selectBuildingBlocks model.searchKind
    , selectConstructedMolecules:
        selectConstructedMolecules model.searchKind
    , getMoleculesButton:
        { onClick: onClick actionCreators
        }
    }
  where
    selectBuildingBlocks UnsortedAll = true
    selectBuildingBlocks UnsortedBuildingBlocks = true
    selectBuildingBlocks _ = false

    selectConstructedMolecules UnsortedAll = true
    selectConstructedMolecules UnsortedConstructedMolecules = true
    selectConstructedMolecules _ = false


onClick
    :: forall a r
    .  Deferred
    => ActionCreators a r
    -> DispatchAction a
    -> Snackbars
    -> MongoData
    -> Promise Unit

onClick actionCreators dispatch snackbars mongoData
    = catch
        (_onClick actionCreators dispatch snackbars mongoData)
        (_errorSnackbar snackbars.error)

_onClick
    :: forall a r
    .  Deferred
    => ActionCreators a r
    -> DispatchAction a
    -> Snackbars
    -> MongoData
    -> Promise Unit

_onClick
    actionCreators
    dispatch
    snackbars
    { url
    , moleculeKey
    , database
    , moleculeCollection
    , constructedMoleculeCollection
    , positionMatrixCollection
    , buildingBlockPositionMatrixCollection
    , numEntriesPerPage
    , selectBuildingBlocks: true
    , selectConstructedMolecules: true
    }
    = do
        result <- AllRequest.request
            { url
            , database
            , moleculeKey
            , moleculeCollection
            , constructedMoleculeCollection
            , positionMatrixCollection
            , buildingBlockPositionMatrixCollection
            , pageIndex: 0
            , numEntriesPerPage
            , ignoredCollections: []
            }

        let
            (AllRequest.Result
                { valueCollections, molecules, pageKind }
            ) = result

            payload =
                { url
                , database
                , moleculeKey
                , moleculeCollection
                , constructedMoleculeCollection
                , positionMatrixCollection
                , buildingBlockPositionMatrixCollection
                , pageIndex: 0
                , numEntriesPerPage
                , ignoredCollections: []
                , pageKind: PageKind.fromRequest pageKind
                , valueCollections
                , columns:
                    Array.concat [[moleculeKey], valueCollections]
                , molecules:
                    map (Molecule.molecule' moleculeKey) molecules
                }

        pure (unsafePerformEffect
            (runEffectFn1 dispatch
                (actionCreators.initUnsortedAll payload)
            )
        )

_onClick
    actionCreators
    dispatch
    snackbars
    { url
    , moleculeKey
    , database
    , moleculeCollection
    , constructedMoleculeCollection
    , positionMatrixCollection
    , buildingBlockPositionMatrixCollection
    , numEntriesPerPage
    , selectBuildingBlocks: false
    , selectConstructedMolecules: true
    }
    = do
        result <- ConstructedMoleculesRequest.request
            { url
            , database
            , moleculeKey
            , moleculeCollection
            , constructedMoleculeCollection
            , positionMatrixCollection
            , pageIndex: 0
            , numEntriesPerPage
            , ignoredCollections: []
            }

        let
            (ConstructedMoleculesRequest.Result
                { valueCollections, molecules, pageKind }
            ) = result

            payload =
                { url
                , database
                , moleculeKey
                , moleculeCollection
                , constructedMoleculeCollection
                , positionMatrixCollection
                , buildingBlockPositionMatrixCollection
                , pageIndex: 0
                , numEntriesPerPage
                , ignoredCollections: []
                , pageKind: PageKind.fromRequest pageKind
                , valueCollections
                , columns:
                    Array.concat [[moleculeKey], valueCollections]
                , molecules:
                    map (Molecule.molecule' moleculeKey) molecules
                }

        pure (unsafePerformEffect
            (runEffectFn1 dispatch
                (actionCreators.initUnsortedConstructedMolecules
                    payload
                )
            )
        )

_onClick
    actionCreators
    dispatch
    snackbars
    { url
    , moleculeKey
    , database
    , moleculeCollection
    , constructedMoleculeCollection
    , positionMatrixCollection
    , buildingBlockPositionMatrixCollection
    , numEntriesPerPage
    , selectBuildingBlocks: true
    , selectConstructedMolecules: false
    }
    = do
        result <- BuildingBlocksRequest.request
            { url
            , database
            , moleculeKey
            , moleculeCollection
            , constructedMoleculeCollection
            , positionMatrixCollection
            , pageIndex: 0
            , numEntriesPerPage
            , ignoredCollections: []
            }

        let
            (BuildingBlocksRequest.Result
                { valueCollections, molecules, pageKind }
            ) = result

            payload =
                { url
                , database
                , moleculeKey
                , moleculeCollection
                , constructedMoleculeCollection
                , positionMatrixCollection
                , buildingBlockPositionMatrixCollection
                , pageIndex: 0
                , numEntriesPerPage
                , ignoredCollections: []
                , pageKind: PageKind.fromRequest pageKind
                , valueCollections
                , columns:
                    Array.concat [[moleculeKey], valueCollections]
                , molecules:
                    map (Molecule.molecule' moleculeKey) molecules
                }

        pure (unsafePerformEffect
            (runEffectFn1 dispatch
                (actionCreators.initUnsortedBuildingBlocks
                    payload
                )
            )
        )

_onClick
    actionCreators
    dispatch
    snackbars
    mongoData@
        { selectBuildingBlocks: false
        , selectConstructedMolecules: false
        }
    = pure (unsafePerformEffect
        (log "No valid request can be made.")
    )

_errorSnackbar
    :: Deferred
    => Snackbar
    -> Error.Error
    -> Promise Unit

_errorSnackbar snackbar error = pure
    (unsafePerformEffect
        (_showErrorSnackbar snackbar error)
    )

_showErrorSnackbar :: Snackbar -> Error.Error -> Effect Unit
_showErrorSnackbar snackbar error = do
    runEffectFn1 snackbar.setMessage (Error.message error)
    runEffectFn1 snackbar.setOpen true


---- UPDATE ----

type Action =
    { type    :: String
    , payload :: Payload
    }

data Payload
    = DoNothing

doNothing :: Action
doNothing =
    { type: "DO_NOTHING"
    , payload: DoNothing
    }

reducer :: Model -> Action -> Model
reducer model action = case action of
    ({ payload: DoNothing }) -> model
