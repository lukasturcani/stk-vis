module MongoConfigurator.MongoConfigurator.Internal.Props.Internal.GetMoleculesButton
    ( getMoleculesButtonProps
    , GetMoleculesButtonProps
    , DispatchAction
    , ActionCreators
    , MongoData
    ) where

import Prelude
import Effect.Promise (class Deferred, Promise)
import Effect.Class.Console (log)
import Data.Array as Array
import Effect.Uncurried (EffectFn1, runEffectFn1)
import Effect.Unsafe (unsafePerformEffect)

import MoleculeBrowser.Initialize.UnsortedAll
    ( InitializeUnsortedAll
    , initializeUnsortedAll
    )

import MoleculeBrowser.Initialize.UnsortedBuildingBlocks
    ( InitializeUnsortedBuildingBlocks
    , initializeUnsortedBuildingBlocks
    )

import MoleculeBrowser.Initialize.UnsortedConstructedMolecules
    ( InitializeUnsortedConstructedMolecules
    , initializeUnsortedConstructedMolecules
    )

import Molecules.InitializeMolecules (initializeMolecules)
import Molecules.Molecule as Molecule

import RequestManager.InitializeUnsortedAll (initializeUnsortedAll)
    as Manager

import RequestManager.InitializeUnsortedBuildingBlocks
    ( initializeUnsortedBuildingBlocks
    ) as Manager

import RequestManager.InitializeUnsortedConstructedMolecules
    ( initializeUnsortedConstructedMolecules
    ) as Manager

import Requests.UnsortedAll as AllRequest
import Requests.UnsortedBuildingBlocks as BuildingBlocksRequest
import RequestManager.PageKind (fromRequest)

import MongoConfigurator.MongoConfigurator.Internal.MongoConfigurator
    ( MongoConfigurator
    )

import Requests.UnsortedConstructedMolecules
    as ConstructedMoleculesRequest

type DispatchAction a = EffectFn1 a Unit

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

type Snackbar =
    { setOpen    :: EffectFn1 Boolean Unit
    , setMessage :: EffectFn1 String Unit
    }

type Snackbars =
    { success :: Snackbar
    , error   :: Snackbar
    }

data GetMoleculesButtonProps a = GetMoleculesButtonProps
    { onClick
        :: Deferred
        => DispatchAction a
        -> Snackbars
        -> MongoData
        -> Promise Unit
    }

type ActionCreators a r =
    { initializeUnsortedAll :: InitializeUnsortedAll -> a

    , initializeUnsortedBuildingBlocks
        :: InitializeUnsortedBuildingBlocks -> a

    , initializeUnsortedConstructedMolecules
        :: InitializeUnsortedConstructedMolecules -> a

    | r

    }

getMoleculesButtonProps
    :: forall a r
    .  ActionCreators a r
    -> MongoConfigurator
    -> GetMoleculesButtonProps a

getMoleculesButtonProps
    actionCreators
    configurator
    = GetMoleculesButtonProps
        { onClick
        }
  where

    onClick
        :: Deferred
        => DispatchAction a
        -> Snackbars
        -> MongoData
        -> Promise Unit

    onClick
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
                , positionMatrixCollection
                , buildingBlockPositionMatrixCollection
                , pageIndex: 0
                , numEntriesPerPage
                , ignoredCollections: []
                }

            let
                (AllRequest.Result
                    { valueCollections
                    , molecules
                    , pageKind: pageKind'
                    }
                ) = result

                payload = initializeUnsortedAll
                    (initializeMolecules
                        (map
                            (Molecule.molecule' moleculeKey)
                            molecules
                        )
                        (Array.concat
                            [[moleculeKey], valueCollections]
                        )
                    )
                    (Manager.initializeUnsortedAll
                        { url
                        , database
                        , moleculeKey
                        , moleculeCollection
                        , positionMatrixCollection
                        , buildingBlockPositionMatrixCollection
                        , pageIndex: 0
                        , numEntriesPerPage
                        , ignoredCollections: []
                        , pageKind: fromRequest pageKind'
                        , valueCollections
                        }
                    )

            pure (unsafePerformEffect
                (runEffectFn1 dispatch
                    (actionCreators.initializeUnsortedAll payload)
                )
            )

    onClick
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
                    { valueCollections
                    , molecules
                    , pageKind: pageKind'
                    }
                ) = result

                payload = initializeUnsortedConstructedMolecules
                    (initializeMolecules
                        (map
                            (Molecule.molecule' moleculeKey)
                            molecules
                        )
                        (Array.concat
                            [[moleculeKey], valueCollections]
                        )
                    )
                    (Manager.initializeUnsortedConstructedMolecules
                        { url
                        , database
                        , moleculeKey
                        , moleculeCollection
                        , constructedMoleculeCollection
                        , positionMatrixCollection
                        , pageIndex: 0
                        , numEntriesPerPage
                        , ignoredCollections: []
                        , pageKind: fromRequest pageKind'
                        , valueCollections
                        }
                    )

            pure (unsafePerformEffect
                (runEffectFn1 dispatch
                    (actionCreators.initializeUnsortedConstructedMolecules
                        payload
                    )
                )
            )

    onClick
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
                    { valueCollections
                    , molecules
                    , pageKind: pageKind'
                    }
                ) = result

                payload = initializeUnsortedBuildingBlocks
                    (initializeMolecules
                        (map
                            (Molecule.molecule' moleculeKey)
                            molecules
                        )
                        (Array.concat
                            [[moleculeKey], valueCollections]
                        )
                    )
                    (Manager.initializeUnsortedBuildingBlocks
                        { url
                        , database
                        , moleculeKey
                        , moleculeCollection
                        , constructedMoleculeCollection
                        , positionMatrixCollection
                        , pageIndex: 0
                        , numEntriesPerPage
                        , ignoredCollections: []
                        , pageKind: fromRequest pageKind'
                        , valueCollections
                        }
                    )

            pure (unsafePerformEffect
                (runEffectFn1 dispatch
                    (actionCreators.initializeUnsortedBuildingBlocks
                        payload
                    )
                )
            )

    onClick
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
        , selectConstructedMolecules: false
        }
        = pure (unsafePerformEffect
            (log "No valid request can be made.")
        )
