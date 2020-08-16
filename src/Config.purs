module Config
    ( MongoConfigurator
    ) where

type MongoConfigurator =
    { url                               :: String
    , database                          :: String
    , moleculeKey                       :: String
    , moleculeCollection                :: String
    , constructedMoleculeCollection     :: String
    , positionMatrixCollection          :: String
    , buildingBlockPositionMatrixCollection :: String
    , numEntriesPerPage                 :: Int
    , ignoredCollections                :: Array String
    }
