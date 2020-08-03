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
import ValidatedMolecule.ChemicalSymbol as ChemicalSymbol

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
    , _smiles: _smiles' molecule'
    }
  where
    meshes' = Mesh.meshes meshOptions geometryData
    geometryData = fromValidatedMolecule molecule'

type Helpers =
    { atoms :: Validated.Molecule -> Array Validated.MoleculeAtom
    , bonds :: Validated.Molecule -> Array Validated.MoleculeBond

    , chemicalSymbol
        :: Validated.MoleculeAtom -> ChemicalSymbol.ChemicalSymbol

    , atomicNumber :: ChemicalSymbol.ChemicalSymbol -> Int
    , id :: Validated.MoleculeAtom -> Int
    , atom1 :: Validated.MoleculeBond -> Validated.MoleculeAtom
    , atom2 :: Validated.MoleculeBond -> Validated.MoleculeAtom
    , order :: Validated.MoleculeBond -> Int
    }

foreign import meshOptions :: Mesh.MeshOptions
foreign import _smilesImpl :: Helpers -> Validated.Molecule -> String

_smiles' :: Validated.Molecule -> String
_smiles' = _smilesImpl
    { atoms: Validated.atoms
    , bonds: Validated.bonds
    , chemicalSymbol: Validated.chemicalSymbol
    , atomicNumber: ChemicalSymbol.atomicNumber
    , id: Validated.id
    , atom1: Validated.atom1
    , atom2: Validated.atom2
    , order: Validated.order
    }

smiles :: Molecule -> String
smiles (Molecule { _smiles }) = _smiles

meshes :: Molecule -> Array Mesh.Mesh
meshes (Molecule { _meshes }) = _meshes
