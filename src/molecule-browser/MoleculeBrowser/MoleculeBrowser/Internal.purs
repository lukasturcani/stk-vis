module MoleculeBrowser.MoleculeBrowser.Internal.MoleculeBrowser
    ( MoleculeBrowser (..)
    ) where

import RequestManager.RequestManager (RequestManager)
import Molecules.Molecules (Molecules)

data MoleculeBrowser = MoleculeBrowser
    { _requestManager :: RequestManager
    , _molecules      :: Molecules
    }
