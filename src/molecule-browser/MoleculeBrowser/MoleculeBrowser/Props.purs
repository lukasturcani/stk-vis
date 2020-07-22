module MoleculeBrowser.MoleculeBrowser.Internal.Props
    ( Props
    , props
    ) where

import MoleculeBrowser.MoleculeBrowser.Internal.MoleculeBrowser
    ( MoleculeBrowser
    )

data Props = Props
    { kind :: String
    }

props :: MoleculeBrowser -> Props
props browser = Props
    { kind: "Molecule Browser"
    }
