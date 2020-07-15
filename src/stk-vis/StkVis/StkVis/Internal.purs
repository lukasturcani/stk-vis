module StkVis.StkVis.Internal.StkVis
    ( StkVis (..)
    ) where

import MongoConfigurator.MongoConfigurator (MongoConfigurator)

data StkVis
    = MongoConfigurator MongoConfigurator
