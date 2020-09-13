module Page.SaveButton
    ( Props
    , Writer
    , writers
    ) where

import Prelude
import ValidatedMolecule as Validated
import ValidatedMolecule.ChemicalSymbol as ChemicalSymbol
import ValidatedMolecule.Position as Position
import Data.String as String
import Data.Int as Int
import Data.Number.Format as Number
import Data.Array as Array
import Data.Function.Uncurried (Fn0, mkFn0)

type Props =
    { writers :: Array Writer
    }

type Writer =
    { name  :: String
    , write :: Fn0 String
    }


writers :: Validated.Molecule -> Array Writer
writers molecule =
    [
        { name: "MOL"
        , write: mkFn0  (\unit -> _mol molecule)
        }
    ,
        { name: "XYZ"
        , write: mkFn0 (\unit -> _xyz molecule)
        }
    ]


foreign import _molImpl :: Helpers -> Validated.Molecule -> String

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

_mol :: Validated.Molecule -> String
_mol = _molImpl
    { atoms: Validated.atoms
    , bonds: Validated.bonds
    , chemicalSymbol: Validated.chemicalSymbol
    , atomicNumber: ChemicalSymbol.atomicNumber
    , id: Validated.id
    , atom1: Validated.atom1
    , atom2: Validated.atom2
    , order: Validated.order
    }


_xyz :: Validated.Molecule -> String
_xyz molecule = String.joinWith
    "\n"
    (Array.concat
        [ [Int.toStringAs Int.decimal (Array.length atoms) <> "\n"]
        , map atomLine atoms
        , ["\n"]
        ]
    )

  where
    atoms = Validated.atoms molecule
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
