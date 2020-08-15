module Molecule
    ( Molecule
    , properties
    , molecule
    , molecule'
    , smiles
    , meshes
    ) where

import Data.Map (Map, insert)
import MolDraw.DrawMol.Mesh as Mesh
import MolDraw.GeometryData (fromValidatedMolecule)
import ValidatedMolecule as Validated
import ValidatedMolecule.ChemicalSymbol as ChemicalSymbol
import Requests.Molecule as Request

-------------------

data Molecule = Molecule
    { _properties  :: Map String String
    , _molecule    :: Validated.Molecule
    , _smiles      :: String
    , _constructed :: Boolean
    }

properties :: Molecule -> Map String String
properties (Molecule { _properties }) = _properties


-------------------

type IsConstructed = Boolean

molecule
    :: IsConstructed
    -> Validated.Molecule
    -> Map String String
    -> Molecule

molecule constructed' validated properties' = Molecule
    { _properties: properties'
    , _molecule: validated
    , _smiles: _smiles' validated
    , _constructed: constructed'
    }

--------------------

type MoleculeKeyName = String

molecule' :: MoleculeKeyName -> Request.Molecule -> Molecule
molecule' moleculeKey requestMolecule
    = molecule constructed' validated properties'
  where
    constructed' = Request.constructed requestMolecule
    validated = Request.toValidated requestMolecule
    properties' =
        insert
            moleculeKey
            (Request.key requestMolecule)
            (Request.properties requestMolecule)

--------------------

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
meshes (Molecule { _molecule }) = meshes'
  where
    meshes' = Mesh.meshes meshOptions geometryData
    geometryData = fromValidatedMolecule _molecule
