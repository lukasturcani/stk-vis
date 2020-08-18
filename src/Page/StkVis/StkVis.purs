module Page.StkVis
    ( Model
    , Action
    , Payload
    , Props
    , reducer
    , init
    , props
    ) where

import Prelude
import Data.Tuple (Tuple (Tuple))
import Config as Config
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


init :: Model
init = MongoConfigurator MongoConfigurator.init

---- VIEW ----

data Props
    = MongoConfiguratorProps (MongoConfigurator.Props Action)
    | MoleculeBrowserProps (MoleculeBrowser.Props Action)

props :: Model -> Props
props model = case model of
    MongoConfigurator subModel ->
        MongoConfiguratorProps $
            MongoConfigurator.props
                { initUnsortedAll
                , initUnsortedBuildingBlocks
                , initUnsortedConstructedMolecules
                }
                subModel

    UnsortedAll subModel ->
        MoleculeBrowserProps $
            UnsortedAll.props
                { updateMoleculePage:
                    unsortedAllAction <<<
                        UnsortedAll.updateMoleculePage
                , selectMolecule:
                    \rowIndex molecule ->
                        unsortedAllAction $
                            UnsortedAll.selectMolecule
                                rowIndex
                                molecule
                , initMongoConfigurator
                , initSortedAll

                }
                subModel

    UnsortedBuildingBlocks subModel ->
        MoleculeBrowserProps $
            UnsortedBBs.props
                { updateMoleculePage:
                    unsortedBuildingBlocksAction <<<
                        UnsortedBBs.updateMoleculePage
                , selectMolecule:
                    \rowIndex molecule ->
                        unsortedBuildingBlocksAction $
                            UnsortedBBs.selectMolecule
                                rowIndex
                                molecule
                , initMongoConfigurator
                , initSortedBuildingBlocks
                }
                subModel

    UnsortedConstructedMolecules subModel ->
        MoleculeBrowserProps $
            UnsortedCMs.props
                { updateMoleculePage:
                    unsortedConstructedMoleculesAction <<<
                        UnsortedCMs.updateMoleculePage
                , selectMolecule:
                    \rowIndex molecule ->
                        unsortedConstructedMoleculesAction $
                            UnsortedCMs.selectMolecule
                                rowIndex
                                molecule
                , initMongoConfigurator
                , initSortedConstructedMolecules
                }
                subModel

    SortedAll subModel ->
        MoleculeBrowserProps $
            SortedAll.props
                { changeSortedCollection:
                    sortedAllAction <<<
                        SortedAll.changeSortedCollection
                , updateMoleculePage:
                    sortedAllAction <<<
                        SortedAll.updateMoleculePage
                , selectMolecule:
                    \rowIndex molecule ->
                        sortedAllAction $
                            SortedAll.selectMolecule
                                rowIndex
                                molecule
                , initMongoConfigurator
                , initUnsortedAll
                }
                subModel

    SortedBuildingBlocks subModel ->
        MoleculeBrowserProps $
            SortedBBs.props
                { changeSortedCollection:
                    sortedBuildingBlocksAction <<<
                        SortedBBs.changeSortedCollection
                , updateMoleculePage:
                    sortedBuildingBlocksAction <<<
                        SortedBBs.updateMoleculePage
                , selectMolecule:
                    \rowIndex molecule ->
                        sortedBuildingBlocksAction $
                            SortedBBs.selectMolecule
                                rowIndex
                                molecule
                , initMongoConfigurator
                , initUnsortedBuildingBlocks
                }
                subModel

    SortedConstructedMolecules subModel ->
        MoleculeBrowserProps $
            SortedCMs.props
                { changeSortedCollection:
                    sortedConstructedMoleculesAction <<<
                        SortedCMs.changeSortedCollection
                , updateMoleculePage:
                    sortedConstructedMoleculesAction <<<
                        SortedCMs.updateMoleculePage
                , selectMolecule:
                    \rowIndex molecule ->
                        sortedConstructedMoleculesAction $
                            SortedCMs.selectMolecule
                                rowIndex
                                molecule
                , initMongoConfigurator
                , initUnsortedConstructedMolecules
                }
                subModel

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


initUnsortedAll :: Config.UnsortedAll -> Action
initUnsortedAll payload' =
    { type: "INIT_UNSORTED_ALL"
    , payload: InitUnsortedAll payload'
    }

initUnsortedBuildingBlocks :: Config.UnsortedBuildingBlocks -> Action
initUnsortedBuildingBlocks payload' =
    { type: "INIT_UNSORTED_BUILDING_BLOCKS"
    , payload: InitUnsortedBuildingBlocks payload'
    }

initUnsortedConstructedMolecules
    :: Config.UnsortedConstructedMolecules
    -> Action

initUnsortedConstructedMolecules payload' =
    { type: "INIT_UNSORTED_CONSTRUCTED_MOLECULES"
    , payload: InitUnsortedConstructedMolecules payload'
    }

initSortedAll :: Config.SortedAll -> Action
initSortedAll payload' =
    { type: "INIT_SORTED_ALL"
    , payload: InitSortedAll payload'
    }

initSortedBuildingBlocks :: Config.SortedBuildingBlocks -> Action
initSortedBuildingBlocks payload' =
    { type: "INIT_SORTED_BUILDING_BLOCKS"
    , payload: InitSortedBuildingBlocks payload'
    }

initSortedConstructedMolecules
    :: Config.SortedConstructedMolecules
    -> Action

initSortedConstructedMolecules payload' =
    { type: "INIT_SORTED_CONSTRUCTED_MOLECULES"
    , payload: InitSortedConstructedMolecules payload'
    }

initMongoConfigurator :: Config.MongoConfigurator -> Action
initMongoConfigurator payload' =
    { type: "INIT_MONGO_CONFIGURATOR"
    , payload: InitMongoConfigurator payload'
    }

unsortedAllAction :: UnsortedAll.Action -> Action
unsortedAllAction action =
    { type: "UNSORTED_ALL_ACTION"
    , payload: UnsortedAllAction action
    }

unsortedBuildingBlocksAction :: UnsortedBBs.Action -> Action
unsortedBuildingBlocksAction action =
    { type: "UNSORTED_BUILDING_BLOCKS_ACTION"
    , payload: UnsortedBuildingBlocksAction action
    }

unsortedConstructedMoleculesAction :: UnsortedCMs.Action -> Action
unsortedConstructedMoleculesAction action =
    { type: "UNSORTED_CONSTRUCTED_MOLECULES_ACTION"
    , payload: UnsortedConstructedMoleculesAction action
    }

sortedAllAction :: SortedAll.Action -> Action
sortedAllAction action =
    { type: "SORTED_ALL_ACTION"
    , payload: SortedAllAction action
    }

sortedBuildingBlocksAction :: SortedBBs.Action -> Action
sortedBuildingBlocksAction action =
    { type: "SORTED_BUILDING_BLOCKS_ACTION"
    , payload: SortedBuildingBlocksAction action
    }

sortedConstructedMoleculesAction :: SortedCMs.Action -> Action
sortedConstructedMoleculesAction action =
    { type: "SORTED_CONSTRUCTED_MOLECULES_ACTION"
    , payload: SortedConstructedMoleculesAction action
    }



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
