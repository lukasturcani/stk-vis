module StkVis.StkVis.Internal
    ( StkVis (..)
    ) where

import MongoConfigurator.MongoConfigurator (MongoConfigurator)

data StkVis
    = MongoConfigurator MongoConfigurator
