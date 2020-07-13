module MongoConfigurator.Reducers.UpdateFields
    ( updateFields
    ) where

import MongoConfigurator.UpdateFields (Action)

import MongoConfigurator.Data
    ( MongoConfigurator (..)
    , searchKind
    , requestState
    )

updateFields :: MongoConfigurator -> Action -> MongoConfigurator
updateFields one two = one
