module Molecules.Molecule
    ( Molecule
    , properties
    , molecule
    , smiles
    , meshes
    ) where

import Data.Map (Map)
import MolDraw.DrawMol.Mesh (Mesh)

data Molecule = Molecule
    { _properties :: Map String String
    , _meshes     :: Array Mesh
    , _smiles     :: String
    }

properties :: Molecule -> Map String String
properties (Molecule { _properties }) = _properties

molecule :: Map String String -> Molecule
molecule properties' = Molecule
    { _properties: properties'
    , _meshes: []
    , _smiles: "C1CCC1"
    }

smiles :: Molecule -> String
smiles (Molecule { _smiles }) = _smiles

meshes :: Molecule -> Array Mesh
meshes (Molecule { _meshes }) = _meshes

