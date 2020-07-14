module StkVis.Internal.Data.Internal.StkVis
    ( StkVis (..)
    ) where

import MongoConfigurator (MongoConfigurator)

data StkVis
    = MongoConfigurator MongoConfigurator
