module StkVis.StkVis.Internal.StkVis
    ( StkVis (..)
    ) where

import MongoConfigurator.MongoConfigurator (MongoConfigurator)
import MoleculeBrowser.MoleculeBrowser (MoleculeBrowser)

data StkVis
    = MongoConfigurator MongoConfigurator
    | MoleculeBrowser MoleculeBrowser
