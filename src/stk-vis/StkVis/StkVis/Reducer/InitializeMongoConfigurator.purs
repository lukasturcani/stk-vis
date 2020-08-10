module StkVis.StkVis.Internal.Reduer.Internal.InitializeMongoConfigurator
    ( initializeMongoConfigurator
    ) where

import Prelude
import StkVis.StkVis.Internal.StkVis as StkVis
import MongoConfigurator.MongoConfigurator as MongoConfigurator
import MongoConfigurator.Action as Action

import StkVis.InitializeMongoConfigurator
    ( InitializeMongoConfigurator
    , toMongoConfigurator
    )

initializeMongoConfigurator
    :: StkVis.StkVis -> InitializeMongoConfigurator -> StkVis.StkVis

initializeMongoConfigurator
    stkVis
    payload
    = StkVis.MongoConfigurator $ MongoConfigurator.reducer
        MongoConfigurator.initialState
        (Action.initializeMongoConfigurator
            (toMongoConfigurator payload)
        )


