module StkVis.StkVis.Internal.Props
    ( Props (..)
    , ActionCreators
    , props
    ) where

import StkVis.StkVis.Internal.StkVis (StkVis (..)) as StkVis
import MongoConfigurator.MongoConfigurator as MongoConfigurator
import MoleculeBrowser.MoleculeBrowser as MoleculeBrowser
import RequestManager.UpdateMoleculePage (UpdateMoleculePage)
import RequestManager.SetSorted (SetSorted)
import RequestManager.SetUnsorted (SetUnsorted)

data Props a
    = MongoConfigurator MongoConfigurator.Props
    | MoleculeBrowser (MoleculeBrowser.Props a)

type ActionCreators a =
    { updateMoleculePage :: UpdateMoleculePage -> a
    , setSorted :: SetSorted -> a
    , setUnsorted :: SetUnsorted -> a
    }

props
    :: forall a
    .  ActionCreators a
    -> StkVis.StkVis
    -> Props a

props actionCreators (StkVis.MongoConfigurator configurator)
    = MongoConfigurator (MongoConfigurator.props configurator)

props actionCreators (StkVis.MoleculeBrowser browser)
    = MoleculeBrowser (MoleculeBrowser.props actionCreators browser)
