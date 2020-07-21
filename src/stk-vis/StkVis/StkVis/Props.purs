module StkVis.StkVis.Internal.Props
    ( Props
    , props
    ) where

import StkVis.StkVis.Internal.StkVis (StkVis (..))
import MongoConfigurator.MongoConfigurator as MongoConfigurator

data Props
    = Configurator MongoConfigurator.Props

props :: StkVis -> Props
props (MongoConfigurator configurator)
    = Configurator (MongoConfigurator.props configurator)
