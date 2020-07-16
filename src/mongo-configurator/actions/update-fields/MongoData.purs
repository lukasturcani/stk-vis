module MongoConfigurator.UpdateFields.MongoData
    ( MongoData
    ) where

import MongoConfigurator.SearchKind (SearchKind)

type MongoData =
    { url                                   :: String
    , database                              :: String
    , moleculeKey                           :: String
    , moleculeCollection                    :: String
    , constructedMoleculeCollection         :: String
    , positionMatrixCollection              :: String
    , buildingBlockPositionMatrixCollection :: String
    , numEntriesPerPage                     :: Int
    , searchKind                            :: SearchKind
    }
