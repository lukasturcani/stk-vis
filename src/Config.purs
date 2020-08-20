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
    , numEntriesPerPage
    , searchKind
    ) where

import Molecule (Molecule, MoleculeKeyValue)
import PageKind (PageKind)
import SelectingCollection (SelectingCollection)
import Page.MongoConfigurator.SearchKind (SearchKind)
import Page.MongoConfigurator.SearchKind as SearchKind
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
    , twoDViewer                        :: Boolean
    , threeDViewer                      :: Boolean
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
    , twoDViewer                        :: Boolean
    , threeDViewer                      :: Boolean
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
    , twoDViewer                        :: Boolean
    , threeDViewer                      :: Boolean
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
    , twoDViewer                        :: Boolean
    , threeDViewer                      :: Boolean
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
    , twoDViewer                        :: Boolean
    , threeDViewer                      :: Boolean
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
    , twoDViewer                        :: Boolean
    , threeDViewer                      :: Boolean
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
    , twoDViewer                        :: Boolean
    , threeDViewer                      :: Boolean
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
    , twoDViewer                        :: Boolean
    , threeDViewer                      :: Boolean
    }

numEntriesPerPage :: MoleculeBrowser -> Int
numEntriesPerPage browser = case browser of
    UnsortedAll config -> config.numEntriesPerPage
    UnsortedBuildingBlocks config -> config.numEntriesPerPage
    UnsortedConstructedMolecules config -> config.numEntriesPerPage
    SortedAll config -> config.numEntriesPerPage
    SortedBuildingBlocks config -> config.numEntriesPerPage
    SortedConstructedMolecules config -> config.numEntriesPerPage


searchKind :: MoleculeBrowser -> SearchKind
searchKind browser = case browser of
    UnsortedAll _ -> SearchKind.UnsortedAll
    UnsortedBuildingBlocks _ -> SearchKind.UnsortedBuildingBlocks
    UnsortedConstructedMolecules _ ->
        SearchKind.UnsortedConstructedMolecules
    SortedAll _ -> SearchKind.UnsortedAll
    SortedBuildingBlocks _ -> SearchKind.UnsortedBuildingBlocks
    SortedConstructedMolecules _ ->
        SearchKind.UnsortedConstructedMolecules

