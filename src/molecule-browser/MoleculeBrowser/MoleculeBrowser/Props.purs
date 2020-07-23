module MoleculeBrowser.MoleculeBrowser.Internal.Props
    ( Props
    , props
    ) where

import MoleculeBrowser.SortType (SortType)
import MoleculeBrowser.PageData (PageData)

import MoleculeBrowser.MoleculeBrowser.Internal.MoleculeBrowser
    ( MoleculeBrowser
    )

data Props
    = UnsortedAll
        { kind                                  :: String
        , url                                   :: String
        , database                              :: String
        , moleculeKey                           :: String
        , moleculeCollection                    :: String
        , positionMatrixCollection              :: String
        , buildingBlockPositionMatrixCollection :: String
        , numEntriesPerPage                     :: Int
        , valueCollections                      :: String
        , pageData                              :: PageData
        }
    | UnsortedOne
        { kind                                  :: String
        , url                                   :: String
        , database                              :: String
        , moleculeKey                           :: String
        , moleculeCollection                    :: String
        , constructedMoleculeCollection         :: String
        , positionMatrixCollection              :: String
        , numEntriesPerPage                     :: Int
        , valueCollections                      :: String
        , pageData                              :: PageData
        }
    | SortedAll
        { kind                                  :: String
        , url                                   :: String
        , database                              :: String
        , moleculeKey                           :: String
        , moleculeCollection                    :: String
        , positionMatrixCollection              :: String
        , buildingBlockPositionMatrixCollection :: String
        , numEntriesPerPage                     :: Int
        , sortedCollection                      :: String
        , sortType                              :: SortType
        , valueCollections                      :: String
        , pageData                              :: PageData
        }
    | SortedOne
        { kind                                  :: String
        , url                                   :: String
        , database                              :: String
        , moleculeKey                           :: String
        , moleculeCollection                    :: String
        , constructedMoleculeCollection         :: String
        , positionMatrixCollection              :: String
        , numEntriesPerPage                     :: Int
        , sortedCollection                      :: String
        , sortType                              :: SortType
        , valueCollections                      :: String
        , pageData                              :: PageData
        }

props :: MoleculeBrowser -> Props
props browser
    = UnsortedAll
        { kind: "Unsorted All"
        }
    | UnsortedOne
        { kind: "Unsorted Building Blocks"
        }
    | UnsortedOne
        { kind: "Unsorted Constructed Molecules"
        }
    | SortedAll
        { kind: "Sorted All"
        }
    | SortedOne
        { kind: "Sorted Building Blocks"
        }
    | SortedOne
        { kind: "Sorted Constructed Molecules"
        }
