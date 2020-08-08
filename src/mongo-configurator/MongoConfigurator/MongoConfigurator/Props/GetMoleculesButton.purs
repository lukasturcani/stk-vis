module MongoConfigurator.MongoConfigurator.Internal.Props.Internal.GetMoleculesButton
    ( getMoleculesButtonProps
    , GetMoleculesButtonProps
    , DispatchAction
    , ActionCreators
    , MongoData
    )

import Prelude
import Effect (Effect)
import Effect.Promise (class Deferred, Promise)

import MongoConfigurator.InitializeMoleculeBrowser.UnsortedAll
    ( InitializeUnsortedAll
    , initializeUnsortedAll
    )

import MongoConfigurator.InitializeMoleculeBrowser.UnsortedBuildingBlocks
    ( InitializeUnsortedBuildingBlocks
    , initializeUnsortedBuildingBlocks
    )

import MongoConfigurator.InitializeMoleculeBrowser.UnsortedConstructedMolecules
    ( InitializeUnsortedConstructedMolecules
    , initializeUnsortedConstructedMolecules
    )

import Molecules.IntializeMolecules (initializeMolecules)
import RequestManager.InitializeUnsortedAll (initializeUnsortedAll)
import Requests.UnsortedAll as AllRequest
import Requests.UnsortedBuildingBlocks as BuildingBlocksRequest
import RequestManager.PageKind (fromRequest)

import Requests.UnsortedConstructedMolecules
    as ConstructedMoleculesRequest

type DispatchAction a = a -> Effect Unit

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

data GetMoleculesButtonProps a = GetMoleculesButtonProps
    { onClick
        :: Deferred
        => DispatchAction a
        -> MongoData
        -> Promise (Effect Unit)
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
    :: forall a
    .  ActionCreators a
    -> MongoConfigurator
    -> GetMoleculesButtonProps a

getMoleculesButtonProps
    actionCreators
    { url
    , moleculeKey
    , database
    , moleculeCollection
    , constructedMoleculeCollection
    , positionMatrixCollection
    , buildingBlockPositionMatrixCollection
    , numEntriesPerPage
    , selectBuildingBlocks
    , selectConstructedMolecules
    }
    = GetMoleculesButtonsProps
        { onClick
        }
  where

    onClick
        :: Deferred
        -> DispatchAction a
        -> MongoData
        -> Promise (Effect Unit)

    onClick
        dispatch
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
                        molecules
                        (Array.concat
                            [[moleculeKey], valueCollections]
                        )
                    )
                    (initializeRequestManager
                        { url
                        , database
                        , moleculeKey
                        , moleculeCollection
                        , positionMatrixCollection
                        , buildingBlocksPositionMatrixCollection
                        , pageIndex: 0
                        , numEntriesPerPage
                        , ignoredCollections: []
                        , pageKind: fromRequest pageKind'
                        , valueCollections
                        }
                    )

            pure
                (dispatch
                    (actionCreators.initializeUnsortedAll payload)
                )
