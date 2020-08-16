module Page.MongoConfigurator
    ( Model
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

---- MODEL ----


type Model =
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
    , searchKind                            :: SearchKind
    }

data SearchKind
    = UnsortedAll
    | UnsortedBuildingBlocks
    | UnsortedConstructedMolecules
    | SortedAll
    | SortedConstructedMolecules
    | SortedBuildingBlocks


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
        -> Unit
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
    , moleculeKey                           :: String
    , database                              :: String
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
    , initSortedAll :: Config.SortedAll -> a
    , initSortedBuildingBlocks :: Config.SortedBuildingBlocks -> a
    , initSortedConstructedMolecules
        :: Config.SortedConstructedMolecules
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
    selectBuildingBlocks SortedAll = true
    selectBuildingBlocks SortedBuildingBlocks = true
    selectBuildingBlocks _ = false

    selectConstructedMolecules UnsortedAll = true
    selectConstructedMolecules UnsortedConstructedMolecules = true
    selectConstructedMolecules SortedAll = true
    selectConstructedMolecules SortedConstructedMolecules = true
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
    mongoData@
        { selectBuildingBlocks: false
        , selectConstructedMolecules: false
        }
    = pure (unsafePerformEffect
        (log "No valid request can be made.")
    )

_onClick
    actionCreators
    dispatch
    snackbars
    _
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
