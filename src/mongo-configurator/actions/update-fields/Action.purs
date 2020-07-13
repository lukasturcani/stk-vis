module MongoConfigurator.UpdateFields.Action
    ( Action (..)
    ) where

import MongoConfigurator.MongoData (MongoData)

data Action = Action MongoData
