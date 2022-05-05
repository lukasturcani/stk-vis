module Molecule
    ( Molecule
    , MoleculeKeyValue
    , properties
    , molecule
    , molecule'
    , smiles
    , meshes
    , key
    , molString
    , xyzString
    ) where

import Prelude
import Data.Map (Map, insert)
import MolDraw.DrawMol.Mesh as Mesh
import MolDraw.GeometryData (fromValidatedMolecule)
import ValidatedMolecule as Validated
import ValidatedMolecule.ChemicalSymbol as ChemicalSymbol
import ValidatedMolecule.Position as Position
import Requests.Molecule as Request
import Data.String as String
import Data.Int as Int
import Data.Number.Format as Number
import Data.Array as Array

-------------------

data Molecule = Molecule
    { _properties  :: Map String String
    , _molecule    :: Validated.Molecule
    , _smiles      :: String
    , _constructed :: Boolean
    , _key         :: MoleculeKeyValue
    }

properties :: Molecule -> Map String String
properties (Molecule { _properties }) = _properties

key :: Molecule -> MoleculeKeyValue
key (Molecule { _key }) = _key

-------------------

type IsConstructed = Boolean
type MoleculeKeyValue = String

molecule
    :: IsConstructed
    -> MoleculeKeyValue
    -> Validated.Molecule
    -> Map String String
    -> Molecule

molecule constructed' key' validated properties' = Molecule
    { _properties: properties'
    , _molecule: validated
    , _smiles: _smiles' validated
    , _constructed: constructed'
    , _key: key'
    }

--------------------

type MoleculeKeyName = String

molecule' :: MoleculeKeyName -> Request.Molecule -> Molecule
molecule' moleculeKey requestMolecule
    = molecule constructed' key' validated properties'
  where
    constructed' = Request.constructed requestMolecule
    validated = Request.toValidated requestMolecule
    key' = Request.key requestMolecule
    properties' =
        insert
            moleculeKey
            key'
            (Request.properties requestMolecule)

--------------------

type Helpers =
    { atoms :: Validated.Molecule -> Array Validated.MoleculeAtom
    , bonds :: Validated.Molecule -> Array Validated.MoleculeBond

    , chemicalSymbol
        :: Validated.MoleculeAtom
        -> ChemicalSymbol.ChemicalSymbol

    , atomicNumber :: ChemicalSymbol.ChemicalSymbol -> Int
    , id           :: Validated.MoleculeAtom -> Int
    , positionX    :: Validated.MoleculeAtom -> Number
    , positionY    :: Validated.MoleculeAtom -> Number
    , positionZ    :: Validated.MoleculeAtom -> Number
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
    , positionX: Position.x <<< Validated.position
    , positionY: Position.y <<< Validated.position
    , positionZ: Position.z <<< Validated.position
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

--------------------

foreign import _molImpl :: Helpers -> Validated.Molecule -> String


molString :: Molecule -> String
molString (Molecule { _molecule }) = _molImpl
    { atoms: Validated.atoms
    , bonds: Validated.bonds
    , chemicalSymbol: Validated.chemicalSymbol
    , atomicNumber: ChemicalSymbol.atomicNumber
    , id: Validated.id
    , positionX: Position.x <<< Validated.position
    , positionY: Position.y <<< Validated.position
    , positionZ: Position.z <<< Validated.position
    , atom1: Validated.atom1
    , atom2: Validated.atom2
    , order: Validated.order
    }
    _molecule


xyzString :: Molecule -> String
xyzString (Molecule { _molecule }) = String.joinWith
    "\n"
    (Array.concat
        [ [Int.toStringAs Int.decimal (Array.length atoms) <> "\n"]
        , map atomLine atoms
        , ["\n"]
        ]
    )

  where
    atoms = Validated.atoms _molecule
    atomLine atom =
        String.joinWith
            " "
            [ _symbol atom
            , Number.toString (Position.x position)
            , Number.toString (Position.y position)
            , Number.toString (Position.z position)
            ]
      where
        position = Validated.position atom


_symbol :: Validated.MoleculeAtom -> String
_symbol atom = case Validated.chemicalSymbol atom of
    ChemicalSymbol.H  -> "H"
    ChemicalSymbol.He -> "He"
    ChemicalSymbol.Li -> "Li"
    ChemicalSymbol.Be -> "Be"
    ChemicalSymbol.B  -> "B"
    ChemicalSymbol.C  -> "C"
    ChemicalSymbol.N  -> "N"
    ChemicalSymbol.O  -> "O"
    ChemicalSymbol.F  -> "F"
    ChemicalSymbol.Ne -> "Ne"
    ChemicalSymbol.Na -> "Na"
    ChemicalSymbol.Mg -> "Mg"
    ChemicalSymbol.Al -> "Al"
    ChemicalSymbol.Si -> "Si"
    ChemicalSymbol.P  -> "P"
    ChemicalSymbol.S  -> "S"
    ChemicalSymbol.Cl -> "Cl"
    ChemicalSymbol.Ar -> "Ar"
    ChemicalSymbol.K  -> "K"
    ChemicalSymbol.Ca -> "Ca"
    ChemicalSymbol.Sc -> "Sc"
    ChemicalSymbol.Ti -> "Ti"
    ChemicalSymbol.V  -> "V"
    ChemicalSymbol.Cr -> "Cr"
    ChemicalSymbol.Mn -> "Mn"
    ChemicalSymbol.Fe -> "Fe"
    ChemicalSymbol.Co -> "Co"
    ChemicalSymbol.Ni -> "Ni"
    ChemicalSymbol.Cu -> "Cu"
    ChemicalSymbol.Zn -> "Zn"
    ChemicalSymbol.Ga -> "Ga"
    ChemicalSymbol.Ge -> "Ge"
    ChemicalSymbol.As -> "As"
    ChemicalSymbol.Se -> "Se"
    ChemicalSymbol.Br -> "Br"
    ChemicalSymbol.Kr -> "Kr"
    ChemicalSymbol.Rb -> "Rb"
    ChemicalSymbol.Sr -> "Sr"
    ChemicalSymbol.Y  -> "Y"
    ChemicalSymbol.Zr -> "Zr"
    ChemicalSymbol.Nb -> "Nb"
    ChemicalSymbol.Mo -> "Mo"
    ChemicalSymbol.Tc -> "Tc"
    ChemicalSymbol.Ru -> "Ru"
    ChemicalSymbol.Rh -> "Rh"
    ChemicalSymbol.Pd -> "Pd"
    ChemicalSymbol.Ag -> "Ag"
    ChemicalSymbol.Cd -> "Cd"
    ChemicalSymbol.In -> "In"
    ChemicalSymbol.Sn -> "Sn"
    ChemicalSymbol.Sb -> "Sb"
    ChemicalSymbol.Te -> "Te"
    ChemicalSymbol.I  -> "I"
    ChemicalSymbol.Xe -> "Xe"
    ChemicalSymbol.Cs -> "Cs"
    ChemicalSymbol.Ba -> "Ba"
    ChemicalSymbol.Hf -> "Hf"
    ChemicalSymbol.Ta -> "Ta"
    ChemicalSymbol.W  -> "W"
    ChemicalSymbol.Re -> "Re"
    ChemicalSymbol.Os -> "Os"
    ChemicalSymbol.Ir -> "Ir"
    ChemicalSymbol.Pt -> "Pt"
    ChemicalSymbol.Au -> "Au"
    ChemicalSymbol.Hg -> "Hg"
    ChemicalSymbol.Tl -> "Tl"
    ChemicalSymbol.Pb -> "Pb"
    ChemicalSymbol.Bi -> "Bi"
    ChemicalSymbol.Po -> "Po"
    ChemicalSymbol.At -> "At"
    ChemicalSymbol.Rn -> "Rn"
    ChemicalSymbol.Fr -> "Fr"
    ChemicalSymbol.Ra -> "Ra"
    ChemicalSymbol.Rf -> "Rf"
    ChemicalSymbol.Db -> "Db"
    ChemicalSymbol.Sg -> "Sg"
    ChemicalSymbol.Bh -> "Bh"
    ChemicalSymbol.Hs -> "Hs"
    ChemicalSymbol.Mt -> "Mt"
    ChemicalSymbol.La -> "La"
    ChemicalSymbol.Ce -> "Ce"
    ChemicalSymbol.Pr -> "Pr"
    ChemicalSymbol.Nd -> "Nd"
    ChemicalSymbol.Pm -> "Pm"
    ChemicalSymbol.Sm -> "Sm"
    ChemicalSymbol.Eu -> "Eu"
    ChemicalSymbol.Gd -> "Gd"
    ChemicalSymbol.Tb -> "Tb"
    ChemicalSymbol.Dy -> "Dy"
    ChemicalSymbol.Ho -> "Ho"
    ChemicalSymbol.Er -> "Er"
    ChemicalSymbol.Tm -> "Tm"
    ChemicalSymbol.Yb -> "Yb"
    ChemicalSymbol.Lu -> "Lu"
    ChemicalSymbol.Ac -> "Ac"
    ChemicalSymbol.Th -> "Th"
    ChemicalSymbol.Pa -> "Pa"
    ChemicalSymbol.U  -> "U"
    ChemicalSymbol.Np -> "Np"
    ChemicalSymbol.Pu -> "Pu"
    ChemicalSymbol.Am -> "Am"
    ChemicalSymbol.Cm -> "Cm"
    ChemicalSymbol.Bk -> "Bk"
    ChemicalSymbol.Cf -> "Cf"
    ChemicalSymbol.Es -> "Es"
    ChemicalSymbol.Fm -> "Fm"
    ChemicalSymbol.Md -> "Md"
    ChemicalSymbol.No -> "No"
    ChemicalSymbol.Lr -> "Lr"
