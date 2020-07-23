module Molecules.Molecules.Internal.Props
    ( MoleculeTableProps
    , moleculeTableProps
    , TwoDViewerProps
    , twoDViewerProps
    , ThreeDViewerProps
    , threeDViewerProps
    ) where

data MoleculeTableProps = MoleculeTableProps

moleculeTableProps :: RequestManger -> MoleculeTableProps
moleculeTableProps requestManger = MoleculeTableProps

data TwoDViewerProps = TwoDViewerProps

twoDViewerProps :: RequestManager -> TwoDViewerProps
twoDViewerProps requestManager = TwoDViewer

data ThreeDViewerProps = ThreeDViewerProps

threeDViewerProps :: RequestManager -> ThreeDViewerProps
threeDViewerProps requestManager = ThreeDViewerProps
