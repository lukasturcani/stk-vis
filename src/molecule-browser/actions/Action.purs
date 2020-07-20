module MoleculeBrowser.Action
    ( Action
    ) where

import MoleculeBrowser.Payload (Payload) as Payload

type Action =
    { type    :: String
    , payload :: Payload.Payload
    }
