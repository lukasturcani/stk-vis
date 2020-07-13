module MongoConfigurator.MongoData
    ( MongoData (..)
    , SearchKind (..)
    , RequestState (..)
    ) where

data MongoData = MongoData
    { url                                   :: String
    , database                              :: String
    , moleculeKey                           :: String
    , moleculeCollection                    :: String
    , constructedMoleculeCollection         :: String
    , positionMatrixCollection              :: String
    , buildingBlockPositionMatrixCollection :: String
    , valueCollections                      :: String
    , numEntriesPerPage                     :: Number
    , searchKind                            :: SearchKind
    , requestState                          :: RequestState
    }

data SearchKind
    = UnsortedAll
    | UnsortedBuildingBlocks
    | UnsortedConstructedMolecules

data RequestState
    = Unsent
    | Sent
    | Success
    | Failure
