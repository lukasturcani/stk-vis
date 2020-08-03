module Molecules.Molecules.Internal.Props
    ( MoleculeTableProps
    , moleculeTableProps
    , TwoDViewerProps
    , twoDViewerProps
    , ThreeDViewerProps
    , threeDViewerProps
    ) where

import Prelude
import Data.Map (Map)
import Data.Tuple (fst, snd)
import Molecules.Molecule as Molecule
import Molecules.Molecules.Internal.Molecules (Molecules (..))
import Molecules.Molecule (properties, smiles, meshes)
import MolDraw.DrawMol.Mesh (MeshOptions, Mesh)
import SelectingCollection
    ( selected
    , all
    )

data MoleculeTableProps = MoleculeTableProps
    { columns :: Array String
    , selectedRow :: Int
    , rows :: Array (Map String String)
    , molecules :: Array Molecule.Molecule
    }

moleculeTableProps :: Molecules -> MoleculeTableProps
moleculeTableProps
    (Molecules { _columns, _molecules })
    = MoleculeTableProps
        { columns: _columns
        , selectedRow: fst (selected _molecules)
        , rows: map properties molecules
        , molecules: molecules
        }
  where
    molecules = all _molecules

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
threeDViewerProps (Molecules { _molecules }) = ThreeDViewerProps
    { meshes: meshes $ snd $ selected _molecules
    }
