module Molecules.Molecules.Internal.Props
    ( MoleculeTableProps
    , moleculeTableProps
    , TwoDViewerProps
    , twoDViewerProps
    , ThreeDViewerProps
    , threeDViewerProps
    ) where

import Prelude
import Data.Either (Either (Right, Left))
import Data.Map (Map, fromFoldable)
import Molecules.Molecules.Internal.Molecules (Molecules)
import MolDraw.DrawMol.Mesh (MeshOptions, Mesh, meshes)
import MolDraw.Atom (atom)
import MolDraw.Bond (bond)
import MolDraw.ChemicalSymbol (ChemicalSymbol (..))
import MolDraw.Position (position)
import MolDraw.GeometryData (GeometryData, maybeMolecule)

data MoleculeTableProps = MoleculeTableProps
    { columns :: Array String
    , selectedRow :: Int
    , rows :: Array (Map String String)
    }

moleculeTableProps :: Molecules -> MoleculeTableProps
moleculeTableProps molecules = MoleculeTableProps
    { columns: ["one", "two", "three", "four"]
    , selectedRow: 1
    , rows:
        []
    }

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


foreign import meshOptions :: MeshOptions

threeDViewerProps :: Molecules -> ThreeDViewerProps
threeDViewerProps molecules = ThreeDViewerProps
    { meshes: meshes'
    }
  where
    atoms =
        [ atom C (position 1.0 0.0 0.0)
        , atom H (position 2.0 0.0 0.0)
        , atom H (position 0.0 0.0 0.0)
        ]
    bonds =
        [ bond 1 0 1
        , bond 1 0 2
        ]
    molecule = maybeMolecule atoms bonds
    meshes' = do
        geometryData <- maybeToArray molecule
        meshes meshOptions geometryData

maybeToArray :: Either String GeometryData -> Array GeometryData
maybeToArray (Left _) = []
maybeToArray (Right geometryData) = [geometryData]
