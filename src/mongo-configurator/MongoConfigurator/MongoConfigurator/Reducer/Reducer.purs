module MongoConfigurator.MongoConfigurator.Internal.Reducer
    ( reducer
    ) where

import MongoConfigurator.Action (Action)
import MongoConfigurator.Payload (Payload (..))
import MongoConfigurator.MongoConfigurator.Internal.MongoConfigurator
    ( MongoConfigurator
    )

import MongoConfigurator.MongoConfigurator.Internal.Reducer.Internal.InitializeMongoConfigurator
    ( initializeMongoConfigurator
    )

reducer :: MongoConfigurator -> Action -> MongoConfigurator
reducer
    configurator
    ({ payload: (InitializeUnsortedAll payload) })
    = configurator

reducer
    configurator
    ({ payload: (InitializeUnsortedConstructedMolecules payload) })
    = configurator

reducer
    configurator
    ({ payload: (InitializeUnsortedBuildingBlocks payload) })
    = configurator

reducer
    configurator
    ({ payload: (InitializeMongoConfigurator payload) })
    = initializeMongoConfigurator configurator payload
