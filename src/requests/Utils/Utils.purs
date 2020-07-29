module Requests.Utils
    ( toMolecule
    ) where

import Data.Array (concat)
import Requests.Molecule (Molecule)
import Mongo as Mongo

foreign import toMolecule :: Mongo.Entry -> Array Molecule
foreign import dataQuery :: Array Molecule -> Mongo.Query
