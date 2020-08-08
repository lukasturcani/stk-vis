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
    ( UnsortedAll
    )

import MongoConfigurator.InitializeMoleculeBrowser.UnsortedBuildingBlocks
    ( UnsortedBuildingBlocks
    )

import MongoConfigurator.InitializeMoleculeBrowser.UnsortedConstructedMolecules
    ( UnsortedConstructedMolecules
    )

import Requests.UnsortedAll as AllRequest
import Requests.UnsortedBuildingBlocks as BuildingBlocksRequest

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
    { InitializeUnsortedAll :: InitializeUnsortedAll -> a

    , InitializeUnsortedBuildingBlocks
        :: InitializeUnsortedBuildingBlocks -> a

    , InitializeUnsortedConstructedMolecules
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
                , pageIndex
                , numEntriesPerPage
                , ignoredCollections
                , sortedCollection
                , sortType: toRequest sortType
                }

            let
                (AllRequest.Result
                    { valueCollections
                    , molecules
                    , pageKind: pageKind'
                    }
                ) = result

                payload = updateMoleculePage
                    { columns:
                        Array.concat [[moleculeKey], valueCollections]
                    , moleculeKey
                    , molecules
                    , pageIndex
                    , pageKind: fromRequest pageKind'
                    , valueCollections
                    }

            pure (dispatch (createAction payload))
