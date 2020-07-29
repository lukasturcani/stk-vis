module Requests.Utils
    ( toMolecule
    ) where

import Data.Map (Map, empty, insert)
import Data.Maybe (Maybe (Nothing, Just))
import ValidatedMolecule as Validated
import Requests.Molecule (Molecule)
import Mongo as Mongo


    }

foreign import dataQuery :: Array Molecule -> Mongo.Query
