module Requests.MoleculeEntry
    ( MoleculeEntry
    , AtomEntry
    , BondEntry
    , PositionEntry
    , toMolecule
    , fromMoleculeQueryEntry
    ) where

import Prelude
import ValidatedMolecule.Position as Position
import ValidatedMolecule as Validated
import ValidatedMolecule.ChemicalSymbol as ChemicalSymbol
import Data.Array as Array
import Data.Array ((!!))
import Data.List as List
import Data.Tuple (Tuple (..))
import Data.Maybe (Maybe (..))
import Data.Maybe.Utils as Maybe
import Data.Foldable (foldM)
import Requests.MoleculeKey (MoleculeKeyName, MoleculeKeyValue)

import Requests.UnvalidatedMoleculeQueryEntry
    ( UnvalidatedMoleculeQueryEntry
    )

newtype AtomEntry     = AtomEntry (Array Int)
newtype BondEntry     = BondEntry (Array Int)
newtype PositionEntry = PositionEntry (Array Number)

type MoleculeEntry r =
    { key            :: MoleculeKeyValue
    , atoms          :: Array AtomEntry
    , bonds          :: Array BondEntry
    , positionMatrix :: Array PositionEntry
    , constructed    :: Boolean
    | r
    }


toMolecule :: forall r. MoleculeEntry r -> Maybe Validated.Molecule
toMolecule entry = do

    atoms <-
        foldM
            (Maybe.addWith atom)
            List.Nil
            (Array.zip entry.atoms entry.positionMatrix)

    bonds <-
        foldM
            (Maybe.addWith bond)
            List.Nil
            entry.bonds

    Validated.molecule
        (Array.reverse $ Array.fromFoldable atoms)
        (Array.fromFoldable bonds)

type Helpers =
    { nothing :: Maybe Unit
    , just    :: Unit -> Maybe Unit
    }

foreign import _fromMoleculeQueryEntry
    :: forall r
    .  Helpers
    -> MoleculeKeyName
    -> UnvalidatedMoleculeQueryEntry
    -> Maybe (MoleculeEntry r)


fromMoleculeQueryEntry
    :: forall r
    .  MoleculeKeyName
    -> UnvalidatedMoleculeQueryEntry
    -> Maybe (MoleculeEntry r)

fromMoleculeQueryEntry key entry =
    _fromMoleculeQueryEntry { nothing: Nothing, just: Just } key entry


position :: PositionEntry -> Maybe Position.Position
position (PositionEntry coordinates) = do
    x <- coordinates !! 0
    y <- coordinates !! 1
    z <- coordinates !! 2
    pure (Position.position x y z)


atom :: Tuple AtomEntry PositionEntry -> Maybe Validated.Atom
atom (Tuple (AtomEntry atomEntry) positionEntry) = do
    atomicNumber <- atomEntry !! 0
    chemicalSymbol <- ChemicalSymbol.chemicalSymbol atomicNumber
    position' <- position positionEntry
    pure $ Validated.atom chemicalSymbol position'


bond :: BondEntry -> Maybe Validated.Bond
bond (BondEntry entry) = do
    atom1Id <- entry !! 0
    atom2Id <- entry !! 1
    order   <- entry !! 2
    pure
        (Validated.bond
            (if order == 9 then 1 else order)
            atom1Id
            atom2Id
        )
