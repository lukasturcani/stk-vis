module Requests.Utils
    ( toMolecules
    ) where

import Requests.Molecule (Molecule)
import Mongo as Mongo

foreign import toMolecules :: Array Mongo.Entry -> Array Molecule
foreign import dataQuery :: Array Molecule -> Mongo.Query
