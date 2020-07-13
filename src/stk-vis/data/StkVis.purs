module StkVis.Internal.Data
    ( StkVis (..)
    ) where

import MongoConfigurator (MongoConfigurator)

data StkVis
    = MongoConfigurator MongoConfigurator
