module StkVis.StkVis.Internal.Props
    ( Props
    , props
    ) where

import StkVis.StkVis.Internal.StkVis (StkVis (..))
import MongoConfigurator.MongoConfigurator as MongoConfigurator
import MongoConfigurator.SearchKind as SearchKind

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
    { kind: "Mongo Configurator"
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
            SearchKind.UnsortedAll                  -> true
            SearchKind.UnsortedBuildingBlocks       -> true
            SearchKind.UnsortedConstructedMolecules -> false
    , selectConstructedMolecules:
        case MongoConfigurator.searchKind configurator of
            SearchKind.UnsortedAll                  -> true
            SearchKind.UnsortedBuildingBlocks       -> false
            SearchKind.UnsortedConstructedMolecules -> true
    }
