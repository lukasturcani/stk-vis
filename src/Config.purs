module Config
    ( MongoConfigurator
    , UnsortedAll
    , UnsortedBuildingBlocks
    , UnsortedConstructedMolecules
    , SortedAll
    , SortedBuildingBlocks
    , SortedConstructedMolecules
    , MoleculeBrowser (..)
    , BuildingBlockBrowser
    ) where

import Molecule (Molecule, MoleculeKeyValue)
import PageKind (PageKind)
import SelectingCollection (SelectingCollection)
import Page.MongoConfigurator.SearchKind (SearchKind)
import SortType (SortType)

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
    , searchKind                        :: SearchKind
    }

type UnsortedAll =
    { url                               :: String
    , database                          :: String
    , moleculeKey                       :: String
    , moleculeCollection                :: String
    , constructedMoleculeCollection     :: String
    , positionMatrixCollection          :: String
    , buildingBlockPositionMatrixCollection :: String
    , pageIndex                         :: Int
    , numEntriesPerPage                 :: Int
    , ignoredCollections                :: Array String
    , pageKind                          :: PageKind
    , valueCollections                  :: Array String
    , columns                           :: Array String
    , molecules                         :: SelectingCollection Molecule
    }

type UnsortedBuildingBlocks =
    { url                               :: String
    , database                          :: String
    , moleculeKey                       :: String
    , moleculeCollection                :: String
    , constructedMoleculeCollection     :: String
    , positionMatrixCollection          :: String
    , buildingBlockPositionMatrixCollection :: String
    , pageIndex                         :: Int
    , numEntriesPerPage                 :: Int
    , ignoredCollections                :: Array String
    , pageKind                          :: PageKind
    , valueCollections                  :: Array String
    , columns                           :: Array String
    , molecules                         :: SelectingCollection Molecule
    }

type UnsortedConstructedMolecules =
    { url                               :: String
    , database                          :: String
    , moleculeKey                       :: String
    , moleculeCollection                :: String
    , constructedMoleculeCollection     :: String
    , positionMatrixCollection          :: String
    , buildingBlockPositionMatrixCollection :: String
    , pageIndex                         :: Int
    , numEntriesPerPage                 :: Int
    , ignoredCollections                :: Array String
    , pageKind                          :: PageKind
    , valueCollections                  :: Array String
    , columns                           :: Array String
    , molecules                         :: SelectingCollection Molecule
    }

type SortedAll =
    { url                               :: String
    , database                          :: String
    , moleculeKey                       :: String
    , moleculeCollection                :: String
    , constructedMoleculeCollection     :: String
    , positionMatrixCollection          :: String
    , buildingBlockPositionMatrixCollection :: String
    , pageIndex                         :: Int
    , numEntriesPerPage                 :: Int
    , ignoredCollections                :: Array String
    , pageKind                          :: PageKind
    , valueCollections                  :: Array String
    , columns                           :: Array String
    , molecules                         :: SelectingCollection Molecule
    , sortedCollection                  :: String
    , sortType                          :: SortType
    }

type SortedBuildingBlocks =
    { url                               :: String
    , database                          :: String
    , moleculeKey                       :: String
    , moleculeCollection                :: String
    , constructedMoleculeCollection     :: String
    , positionMatrixCollection          :: String
    , buildingBlockPositionMatrixCollection :: String
    , pageIndex                         :: Int
    , numEntriesPerPage                 :: Int
    , ignoredCollections                :: Array String
    , pageKind                          :: PageKind
    , valueCollections                  :: Array String
    , columns                           :: Array String
    , molecules                         :: SelectingCollection Molecule
    , sortedCollection                  :: String
    , sortType                          :: SortType
    }

type SortedConstructedMolecules =
    { url                               :: String
    , database                          :: String
    , moleculeKey                       :: String
    , moleculeCollection                :: String
    , constructedMoleculeCollection     :: String
    , positionMatrixCollection          :: String
    , buildingBlockPositionMatrixCollection :: String
    , pageIndex                         :: Int
    , numEntriesPerPage                 :: Int
    , ignoredCollections                :: Array String
    , pageKind                          :: PageKind
    , valueCollections                  :: Array String
    , columns                           :: Array String
    , molecules                         :: SelectingCollection Molecule
    , sortedCollection                  :: String
    , sortType                          :: SortType
    }

data MoleculeBrowser
    = UnsortedAll UnsortedAll
    | UnsortedBuildingBlocks UnsortedBuildingBlocks
    | UnsortedConstructedMolecules UnsortedConstructedMolecules
    | SortedAll SortedAll
    | SortedBuildingBlocks SortedBuildingBlocks
    | SortedConstructedMolecules SortedConstructedMolecules

type BuildingBlockBrowser =
    { url                               :: String
    , database                          :: String
    , moleculeKey                       :: String
    , moleculeCollection                :: String
    , constructedMoleculeCollection     :: String
    , positionMatrixCollection          :: String
    , buildingBlockPositionMatrixCollection :: String
    , ignoredCollections                :: Array String
    , valueCollections                  :: Array String
    , columns                           :: Array String
    , buildingBlocks                    :: SelectingCollection Molecule
    , history                           :: Array MoleculeKeyValue
    , molecule                          :: MoleculeKeyValue
    , moleculeBrowser                   :: MoleculeBrowser
    }
