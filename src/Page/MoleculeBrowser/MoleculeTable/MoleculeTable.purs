module Page.MoleculeBrowser.MoleculeTable
    ( Props
    , RowIndex
    , get
    ) where

import Prelude
import Data.Map (Map)
import Data.Map as Map
import Data.Maybe (Maybe (Just, Nothing))
import Molecule (Molecule)
import DispatchAction (DispatchAction)

type RowIndex = Int

type Props a =
    { columns        :: Array String
    , selectedRow    :: RowIndex
    , rows           :: Array (Map String String)
    , molecules      :: Array Molecule

    , selectMolecule
        :: DispatchAction a
        -> RowIndex
        -> Molecule
        -> Unit
    }

get :: Map String String -> String -> String
get map key =
    case Map.lookup key map of
        Nothing -> ""
        Just string -> string
