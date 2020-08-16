module Page.StkVis
    ( Model
    , Action
    , Payload
    , reducer
    , init
    , props
    ) where


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
    = UnsortedAll UnsortedAll.Action
    | UnsortedBuildingBlocks UnsortedBuildingBlocks.Action
    | UnsortedConstructedMolecules UnsortedConstructedMolecules.Action
    | SortedAll SortedAll.Action
    | SortedBuildingBlocks SortedBuildingBlocks.Action
    | SortedConstructedMolecules SortedConstructedMolecules.Action
    | InitMongoConfigurator Config.MongoConfigurator
    | InitUnsortedAll Config.UnsortedAll
    | InitUnsortedBuildingBlocks Config.UnsortedBuildingBlocks
    | InitUnsortedConstructedMolecules
        Config.UnsortedConstructedMolecules

