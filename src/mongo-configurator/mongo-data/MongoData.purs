module MongoConfigurator.Internal.MongoData
    ( MongoData (..)
    , SearchKind (..)
    ) where

data MongoData = MongoData
    { url                                   :: String
    , database                              :: String
    , moleculeKey                           :: String
    , moleculeCollection                    :: String
    , constructedMoleculeCollection         :: String
    , positionMatrixCollection              :: String
    , buildingBlockPositionMatrixCollection :: String
    , numEntriesPerPage                     :: Number
    , searchKind                            :: SearchKind
    }

data SearchKind
    = UnsortedAll
    | UnsortedBuildingBlocks
    | UnsortedConstructedMolecules
