module StkVis.StkVis.Internal.Props
    ( Props (..)
    , Helpers
    , props
    ) where

import StkVis.StkVis.Internal.StkVis (StkVis (..)) as StkVis
import MongoConfigurator.MongoConfigurator as MongoConfigurator
import MoleculeBrowser.MoleculeBrowser as MoleculeBrowser
import RequestManager.RequestResult (RequestResult)

data Props a
    = MongoConfigurator MongoConfigurator.Props
    | MoleculeBrowser (MoleculeBrowser.Props a)

type Helpers a =
    { pageRequestResultToAction :: (RequestResult -> a)
    }

props
    :: forall a
    .  Helpers a
    -> StkVis.StkVis
    -> Props a

props helpers (StkVis.MongoConfigurator configurator)
    = MongoConfigurator (MongoConfigurator.props configurator)

props helpers (StkVis.MoleculeBrowser browser)
    = MoleculeBrowser (MoleculeBrowser.props helpers browser)
