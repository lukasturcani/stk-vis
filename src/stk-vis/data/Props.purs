module StkVis.Internal.Data.Internal.Props
    ( Props
    , props
    ) where

import StkVis.Internal.Data.Internal.StkVis (StkVis (..))
import MongoConfigurator as MongoConfigurator

type Props
    =
        { kind                                  :: String
        , url                                   :: String
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

props :: StkVis -> Props
props (MongoConfigurator configurator) =
    { kind: "Molecule Configurator"
    , url: MongoConfigurator.url configurator
    , moleculeKey: MongoConfigurator.moleculeKey configurator
    , database: MongoConfigurator.database configurator
    , moleculeCollection:
        MongoConfigurator.moleculeCollection configurator
    , constructedMoleculeCollection:
        MongoConfigurator.constructedMoleculeCollection configurator
    , positionMatrixCollection:
        MongoConfigurator.positionMatrixCollection configurator
    , buildingBlockPositionMatrixCollection:
        MongoConfigurator.buildingBlockPositionMatrixCollection
            configurator
    , numEntriesPerPage:
        MongoConfigurator.numEntriesPerPage configurator
    , selectBuildingBlocks:
        case MongoConfigurator.searchKind configurator of
            MongoConfigurator.UnsortedAll -> true
            MongoConfigurator.UnsortedBuildingBlocks -> true
            MongoConfigurator.UnsortedConstructedMolecules -> false
    , selectConstructedMolecules:
        case MongoConfigurator.searchKind configurator of
            MongoConfigurator.UnsortedAll -> true
            MongoConfigurator.UnsortedBuildingBlocks -> false
            MongoConfigurator.UnsortedConstructedMolecules -> true
    }
