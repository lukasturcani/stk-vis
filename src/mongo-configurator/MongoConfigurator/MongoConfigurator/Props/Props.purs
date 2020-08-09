module MongoConfigurator.MongoConfigurator.Internal.Props
    ( Props
    , module Exports
    , props
    ) where

import MongoConfigurator.MongoConfigurator.Internal.MongoConfigurator
    ( MongoConfigurator (..)
    )

import MongoConfigurator.SearchKind
    ( SearchKind (..)
    )

import MongoConfigurator.MongoConfigurator.Internal.Props.Internal.GetMoleculesButton
    ( GetMoleculesButtonProps
    , ActionCreators
    , getMoleculesButtonProps
    )

import MongoConfigurator.MongoConfigurator.Internal.Props.Internal.GetMoleculesButton
    ( ActionCreators
    ) as Exports

data Props a = Props
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
    , type                                  :: String

    , getMoleculesButton :: GetMoleculesButtonProps a
    }

props :: forall a r. ActionCreators a r -> MongoConfigurator -> Props a
props
    actionCreators
    configurator@(MongoConfigurator
        { _url: url
        , _database: database
        , _moleculeKey: moleculeKey
        , _moleculeCollection: moleculeCollection
        , _constructedMoleculeCollection: constructedMoleculeCollection
        , _positionMatrixCollection: positionMatrixCollection
        , _buildingBlockPositionMatrixCollection:
            buildingBlockPositionMatrixCollection
        , _numEntriesPerPage: numEntriesPerPage
        , _searchKind
        }
    ) = Props
        { url
        , moleculeKey
        , database
        , moleculeCollection
        , constructedMoleculeCollection
        , positionMatrixCollection
        , buildingBlockPositionMatrixCollection
        , numEntriesPerPage
        , selectBuildingBlocks: selectBuildingBlocks _searchKind
        , selectConstructedMolecules:
            selectConstructedMolecules _searchKind
        , getMoleculesButton:
            getMoleculesButtonProps actionCreators configurator
        , type: "Mongo Configurator"
        }

selectBuildingBlocks :: SearchKind -> Boolean
selectBuildingBlocks UnsortedAll = true
selectBuildingBlocks UnsortedBuildingBlocks = true
selectBuildingBlocks UnsortedConstructedMolecules = false

selectConstructedMolecules :: SearchKind -> Boolean
selectConstructedMolecules UnsortedAll = true
selectConstructedMolecules UnsortedBuildingBlocks = false
selectConstructedMolecules UnsortedConstructedMolecules = true
