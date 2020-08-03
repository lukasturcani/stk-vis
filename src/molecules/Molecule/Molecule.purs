module Molecules.Molecule
    ( Molecule
    , properties
    , molecule
    , smiles
    , meshes
    ) where

import Data.Map (Map)
import MolDraw.DrawMol.Mesh as Mesh
import MolDraw.GeometryData (fromValidatedMolecule)
import ValidatedMolecule as Validated

data Molecule = Molecule
    { _properties :: Map String String
    , _meshes     :: Array Mesh.Mesh
    , _smiles     :: String
    }

properties :: Molecule -> Map String String
properties (Molecule { _properties }) = _properties

molecule :: Validated.Molecule -> Map String String -> Molecule
molecule molecule' properties' = Molecule
    { _properties: properties'
    , _meshes: meshes'
    , _smiles: "C1CCC1"
    }
  where
    meshes' = Mesh.meshes meshOptions geometryData
    geometryData = fromValidatedMolecule molecule'

foreign import meshOptions :: Mesh.MeshOptions

smiles :: Molecule -> String
smiles (Molecule { _smiles }) = _smiles

meshes :: Molecule -> Array Mesh.Mesh
meshes (Molecule { _meshes }) = _meshes
