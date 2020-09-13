module Page.SaveButton
    ( Props
    , Writer
    , writers
    ) where

import Molecule (Molecule)
import Molecule as Molecule
import Data.Function.Uncurried (Fn0, mkFn0)

type Props =
    { writers :: Array Writer
    , defaultFilename :: String
    }

type Writer =
    { name        :: String
    , write       :: Fn0 String
    }


writers :: Molecule -> Array Writer
writers molecule =
    [
        { name: "MOL"
        , write: mkFn0  (\unit -> Molecule.molString molecule)
        }
    ,
        { name: "XYZ"
        , write: mkFn0 (\unit -> Molecule.xyzString molecule)
        }
    ]


