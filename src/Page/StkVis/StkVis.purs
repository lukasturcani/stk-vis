module Page.StkVis
    ( Model
    , Action
    , Payload
    ) where

import Config as Config
import Page.MongoConfigurator as MongoConfigurator
import Page.MoleculeBrowser.UnsortedAll as UnsortedAll

import Page.MoleculeBrowser.UnsortedBuildingBlocks
    as UnsortedBuildingBlocks

import Page.MoleculeBrowser.UnsortedConstructedMolecules
    as UnsortedConstructedMolecules

import Page.MoleculeBrowser.SortedAll as SortedAll

import Page.MoleculeBrowser.SortedBuildingBlocks
    as SortedBuildingBlocks

import Page.MoleculeBrowser.SortedConstructedMolecules
    as SortedConstructedMolecules


---- MODEL ----


data Model
    = MongoConfigurator MongoConfigurator.Model
    | UnsortedAll UnsortedAll.Model
    | UnsortedBuildingBlocks UnsortedBuildingBlocks.Model
    | UnsortedConstructedMolecules UnsortedConstructedMolecules.Model
    | SortedAll SortedAll.Model
    | SortedBuildingBlocks SortedBuildingBlocks.Model
    | SortedConstructedMolecules SortedConstructedMolecules.Model


---- VIEW ----


---- UPDATE ----


type Action =
    { type ::    String
    , payload :: Payload
    }

data Payload
    = UnsortedAllAction UnsortedAll.Action
    | UnsortedBuildingBlocksAction UnsortedBuildingBlocks.Action
    | UnsortedConstructedMoleculesAction
        UnsortedConstructedMolecules.Action
    | SortedAllAction SortedAll.Action
    | SortedBuildingBlocksAction SortedBuildingBlocks.Action
    | SortedConstructedMoleculesAction
        SortedConstructedMolecules.Action
    | InitMongoConfigurator Config.MongoConfigurator
    | InitUnsortedAll Config.UnsortedAll
    | InitUnsortedBuildingBlocks Config.UnsortedBuildingBlocks
    | InitUnsortedConstructedMolecules
        Config.UnsortedConstructedMolecules

