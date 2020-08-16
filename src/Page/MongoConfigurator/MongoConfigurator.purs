module Page.MongoConfigurator
    ( Model
    , reducer
    , props
    , doNothing
    ) where


---- MODEL ----


type Model =
    { url                                   :: String
    , database                              :: String
    , moleculeKey                           :: String
    , moleculeCollection                    :: String
    , constructedMoleculeCollection         :: String
    , positionMatrixCollection              :: String
    , buildingBlockPositionMatrixCollection :: String
    , pageIndex                             :: Int
    , numEntriesPerPage                     :: Int
    , ignoredCollections                    :: Array String
    , searchKind                            :: SearchKind
    }

data SearchKind
    = UnsortedAll
    | UnsortedBuildingBlocks
    | UnsortedConstructedMolecules
    | SortedAll
    | SortedConstructedMolecules
    | SortedBuildingBlocks


---- VIEW ----


type Props a =
    { url                                   :: String
    , database                              :: String
    , moleculeKey                           :: String
    , moleculeCollection                    :: String
    , constructedMoleculeCollection         :: String
    , positionMatrixCollection              :: String
    , buildingBlockPositionMatrixCollection :: String
    , numEntriesPerPage                     :: Int
    , ignoredCollections                    :: Array String
    , selectBuildingBlocks                  :: Boolean
    , selectConstructedMolecules            :: Boolean
    }

type ActionCreators a r =
    {
    }

props :: forall a r. ActionCreators a r -> Model -> Props a
props actionCreators model =
    { url: model.url
    , database: model.database
    , moleculeKey: model.moleculeKey
    , moleculeCollection: model.moleculeCollection
    , constructedMoleculeCollection:
        model.constructedMoleculeCollection
    , positionMatrixCollection: model.positionMatrixCollection
    , buildingBlockPositionMatrixCollection:
        model.buildingBlockPositionMatrixCollection
    , numEntriesPerPage: model.numEntriesPerPage
    , ignoredCollections: model.ignoredCollections
    , selectBuildingBlocks:
        selectBuildingBlocks model.searchKind
    , selectConstructedMolecules:
        selectConstructedMolecules model.searchKind
    }
  where
    selectBuildingBlocks UnsortedAll = true
    selectBuildingBlocks UnsortedBuildingBlocks = true
    selectBuildingBlocks SortedAll = true
    selectBuildingBlocks SortedBuildingBlocks = true
    selectBuildingBlocks _ = false

    selectConstructedMolecules UnsortedAll = true
    selectConstructedMolecules UnsortedConstructedMolecules = true
    selectConstructedMolecules SortedAll = true
    selectConstructedMolecules SortedConstructedMolecules = true
    selectConstructedMolecules _ = false


---- UPDATE ----

type Action
    { type    :: String
    , payload :: Payload
    }

data Payload
    | DoNothing

doNothing :: Action
doNothing =
    { type: "DO_NOTHING"
    , payload: DoNothing
    }

reducer :: Model -> Action -> Model
reducer model action = case action of
    ({ payload: DoNothing }) -> model
