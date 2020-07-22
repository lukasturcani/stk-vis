module StkVis.StkVis.Internal.Props
    ( Props (..)
    , props
    ) where

import StkVis.StkVis.Internal.StkVis (StkVis (..)) as StkVis
import MongoConfigurator.MongoConfigurator as MongoConfigurator
import MoleculeBrowser.MoleculeBrowser as MoleculeBrowser

data Props
    = MongoConfigurator MongoConfigurator.Props
    | MoleculeBrowser MoleculeBrowser.Props

props :: StkVis.StkVis -> Props

props (StkVis.MongoConfigurator configurator)
    = MongoConfigurator (MongoConfigurator.props configurator)

props (StkVis.MoleculeBrowser browser)
    = MoleculeBrowser (MoleculeBrowser.props browser)
