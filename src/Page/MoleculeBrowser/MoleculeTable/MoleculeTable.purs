module Page.MoleculeBrowser.MoleculeTable
    ( Props
    , RowIndex
    ) where

import Prelude
import Data.Map (Map)
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
