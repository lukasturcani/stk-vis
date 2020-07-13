module MongoConfigurator.Reducer
    ( reducer
    ) where

import MongoConfigurator.Payload (Payload)

import MongoConfigurator.Data
    ( MongoConfigurator (..)
    , searchKind
    , requestState
    )

reducer :: MongoConfigurator -> Payload -> MongoConfigurator
reducer state _ = state
