module Molecules.Molecules.Internal.Props
    ( MoleculeTableProps
    , moleculeTableProps
    , TwoDViewerProps
    , twoDViewerProps
    , ThreeDViewerProps
    , threeDViewerProps
    ) where

import Molecules.Molecules.Internal.Molecules (Molecules)
import MolDraw.DrawMol.Mesh (Mesh)

data MoleculeTableProps = MoleculeTableProps

moleculeTableProps :: Molecules -> MoleculeTableProps
moleculeTableProps molecules = MoleculeTableProps

data TwoDViewerProps = TwoDViewerProps
    { smiles :: String
    }

twoDViewerProps :: Molecules -> TwoDViewerProps
twoDViewerProps molecules = TwoDViewerProps
    { smiles: "C1CCCCC1"
    }

data ThreeDViewerProps = ThreeDViewerProps
    { meshes :: Array Mesh
    }

threeDViewerProps :: Molecules -> ThreeDViewerProps
threeDViewerProps molecules = ThreeDViewerProps
