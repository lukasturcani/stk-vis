module Molecules.Molecules.Internal.Props
    ( MoleculeTableProps
    , moleculeTableProps
    , TwoDViewerProps
    , twoDViewerProps
    , ThreeDViewerProps
    , threeDViewerProps
    ) where

import Molecules.Molecules.Internal.Molecules (Molecules)

data MoleculeTableProps = MoleculeTableProps

moleculeTableProps :: Molecules -> MoleculeTableProps
moleculeTableProps molecules = MoleculeTableProps

data TwoDViewerProps = TwoDViewerProps

twoDViewerProps :: Molecules -> TwoDViewerProps
twoDViewerProps molecules = TwoDViewerProps

data ThreeDViewerProps = ThreeDViewerProps

threeDViewerProps :: Molecules -> ThreeDViewerProps
threeDViewerProps molecules = ThreeDViewerProps
