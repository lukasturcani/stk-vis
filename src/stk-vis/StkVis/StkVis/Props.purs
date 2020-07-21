module StkVis.StkVis.Internal.Props
    ( Props (..)
    , props
    ) where

import StkVis.StkVis.Internal.StkVis (StkVis (..)) as StkVis
import MongoConfigurator.MongoConfigurator as MongoConfigurator

data Props
    = MongoConfigurator MongoConfigurator.Props

props :: StkVis.StkVis -> Props
props (StkVis.MongoConfigurator configurator)
    = MongoConfigurator (MongoConfigurator.props configurator)
