module Page.StkVis
    ( Model
    , Action
    , Payload
    ) where

import Prelude
import Data.Tuple (Tuple (Tuple))
import Config as Config
import SortType (SortType)
import Page.MongoConfigurator as MongoConfigurator
import Page.MoleculeBrowser.UnsortedAll as UnsortedAll
import Page.MoleculeBrowser.UnsortedBuildingBlocks as UnsortedBBs
import Page.MoleculeBrowser.UnsortedConstructedMolecules as UnsortedCMs
import Page.MoleculeBrowser.SortedAll as SortedAll
import Page.MoleculeBrowser.SortedBuildingBlocks as SortedBBs
import Page.MoleculeBrowser.SortedConstructedMolecules as SortedCMs
import Page.MoleculeBrowser.Props as MoleculeBrowser


---- MODEL ----


data Model
    = MongoConfigurator MongoConfigurator.Model
    | UnsortedAll UnsortedAll.Model
    | UnsortedBuildingBlocks UnsortedBBs.Model
    | UnsortedConstructedMolecules UnsortedCMs.Model
    | SortedAll SortedAll.Model
    | SortedBuildingBlocks SortedBBs.Model
    | SortedConstructedMolecules SortedCMs.Model


---- VIEW ----

data Props
    = MongoConfiguratorProps (MongoConfigurator.Props Action)
    | UnsortedAllProps (MoleculeBrowser.Props Action)
    | UnsortedBuildingBlocksProps (MoleculeBrowser.Props Action)
    | UnsortedConstructedMoleculesProps (MoleculeBrowser.Props Action)
    | SortedAllProps (MoleculeBrowser.Props Action)
    | SortedBuildingBlocksProps (MoleculeBrowser.Props Action)
    | SortedConstructedMoleculesProps (MoleculeBrowser.Props Action)


--props :: Model -> Props -> Model


---- UPDATE ----


type CollectionName = String


type Action =
    { type    :: String
    , payload :: Payload
    }

data Payload
    = UnsortedAllAction UnsortedAll.Action
    | UnsortedBuildingBlocksAction UnsortedBBs.Action
    | UnsortedConstructedMoleculesAction UnsortedCMs.Action
    | SortedAllAction SortedAll.Action
    | SortedBuildingBlocksAction SortedBBs.Action
    | SortedConstructedMoleculesAction SortedCMs.Action
    | InitMongoConfigurator Config.MongoConfigurator
    | InitUnsortedAll Config.UnsortedAll
    | InitUnsortedBuildingBlocks Config.UnsortedBuildingBlocks
    | InitUnsortedConstructedMolecules
        Config.UnsortedConstructedMolecules
    | InitSortedAll Config.SortedAll
    | InitSortedBuildingBlocks Config.SortedBuildingBlocks
    | InitSortedConstructedMolecules Config.SortedConstructedMolecules


payload :: Action -> Payload
payload ({ payload: payload' }) = payload'

reducer :: Model -> Action -> Model
reducer model action = case Tuple model (payload action) of

    Tuple (UnsortedAll subModel) (UnsortedAllAction subAction) ->
        UnsortedAll $ UnsortedAll.reducer subModel subAction

    Tuple
        (UnsortedBuildingBlocks subModel)
        (UnsortedBuildingBlocksAction subAction) ->
            UnsortedBuildingBlocks $
                UnsortedBBs.reducer subModel subAction

    Tuple
        (UnsortedConstructedMolecules subModel)
        (UnsortedConstructedMoleculesAction subAction) ->
            UnsortedConstructedMolecules $
                UnsortedCMs.reducer subModel subAction

    Tuple (SortedAll subModel) (SortedAllAction subAction) ->
        SortedAll $ SortedAll.reducer subModel subAction

    Tuple
        (SortedBuildingBlocks subModel)
        (SortedBuildingBlocksAction subAction) ->
            SortedBuildingBlocks $
                SortedBBs.reducer subModel subAction

    Tuple
        (SortedConstructedMolecules subModel)
        (SortedConstructedMoleculesAction subAction) ->
            SortedConstructedMolecules $
                SortedCMs.reducer subModel subAction

    Tuple _ (InitMongoConfigurator config) ->
        MongoConfigurator $ MongoConfigurator.initFromConfig config

    Tuple _ (InitUnsortedAll config) ->
        UnsortedAll $ UnsortedAll.init config

    Tuple _ (InitUnsortedBuildingBlocks config) ->
        UnsortedBuildingBlocks $ UnsortedBBs.init config

    Tuple _ (InitUnsortedConstructedMolecules config) ->
        UnsortedConstructedMolecules $ UnsortedCMs.init config

    Tuple _ (InitSortedAll config) ->
        SortedAll $ SortedAll.init config

    Tuple _ (InitSortedBuildingBlocks config) ->
        SortedBuildingBlocks $ SortedBBs.init config

    Tuple _ (InitSortedConstructedMolecules config) ->
        SortedConstructedMolecules $ SortedCMs.init config

    Tuple _ _ -> model
