module Molecules.Molecules.Internal.Reducer.Internal.SelectMolecule
    ( selectMolecule
    ) where

import Molecules.Molecules.Internal.Molecules (Molecules (Molecules))
import Molecules.SelectMolecule (SelectMolecule, selected)
import SelectingCollection (select)

selectMolecule :: Molecules -> SelectMolecule -> Molecules
selectMolecule
    (Molecules { _columns, _molecules })
    payload
    = Molecules
        { _columns: _columns
        , _molecules: select _molecules (selected payload)
        }

