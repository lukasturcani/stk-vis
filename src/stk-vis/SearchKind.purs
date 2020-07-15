module StkVis.SearchKind
    ( SearchKind (..)
    , fromConfigurator
    ) where

import MongoConfigurator.SearchKind (SearchKind (..)) as Configurator

data SearchKind
    = UnsortedAll
    | UnsortedBuildingBlocks
    | UnsortedConstructedMolecules

fromConfigurator :: Configurator.SearchKind -> SearchKind

fromConfigurator Configurator.UnsortedAll
    = UnsortedAll
fromConfigurator Configurator.UnsortedBuildingBlocks
    = UnsortedBuildingBlocks
fromConfigurator Configurator.UnsortedConstructedMolecules
    = UnsortedConstructedMolecules

