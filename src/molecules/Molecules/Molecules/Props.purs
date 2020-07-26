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
import Data.Map (Map)
import Data.Tuple (fst, snd)
import Molecules.Molecules.Internal.Molecules (Molecules (..))
import Molecules.Molecule (properties, smiles)
import MolDraw.DrawMol.Mesh (MeshOptions, Mesh, meshes)
import MolDraw.Atom (atom)
import MolDraw.Bond (bond)
import MolDraw.ChemicalSymbol (ChemicalSymbol (..))
import MolDraw.Position (position)
import MolDraw.GeometryData (GeometryData, maybeMolecule)
import SelectingCollection
    ( selected
    , all
    )

data MoleculeTableProps = MoleculeTableProps
    { columns :: Array String
    , selectedRow :: Int
    , rows :: Array (Map String String)
    }

moleculeTableProps :: Molecules -> MoleculeTableProps
moleculeTableProps
    (Molecules { _columns, _molecules })
    = MoleculeTableProps
        { columns: _columns
        , selectedRow: fst (selected _molecules)
        , rows: map properties (all _molecules)
        }

data TwoDViewerProps = TwoDViewerProps
    { smiles :: String
    }

twoDViewerProps :: Molecules -> TwoDViewerProps
twoDViewerProps (Molecules { _molecules }) = TwoDViewerProps
    { smiles: smiles $ snd $ selected _molecules
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
