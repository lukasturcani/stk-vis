module MongoConfigurator.SearchKind
    ( SearchKind (..)
    , unsortedAll
    , unsortedBuildingBlocks
    , unsortedConstructedMolecules
    ) where

data SearchKind
    = UnsortedAll
    | UnsortedBuildingBlocks
    | UnsortedConstructedMolecules

unsortedAll :: SearchKind
unsortedAll = UnsortedAll

unsortedBuildingBlocks :: SearchKind
unsortedBuildingBlocks = UnsortedBuildingBlocks

unsortedConstructedMolecules :: SearchKind
unsortedConstructedMolecules = UnsortedConstructedMolecules
