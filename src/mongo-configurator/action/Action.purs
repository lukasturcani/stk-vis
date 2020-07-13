module MongoConfigurator.Action
    ( Action
    , action
    , name
    , payload
    ) where

import MongoConfigurator.Payload (Payload)

data Action = Action
    { _name     :: String
    , _payload  :: Payload
    }

action :: String -> Payload -> Action
action name' payload' = Action
    { _name: name'
    , _payload: payload'
    }

name :: Action -> String
name (Action { _name }) = _name

payload :: Action -> Payload
payload (Action { _payload }) = _payload
