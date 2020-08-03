module StkVis.Utils.UnsortedAll
    ( initializeMoleculeBrowser
    ) where

import Requests.UnsortedAll (Result)
import StkVis.Action as Action
import RequestManager

initializeMoleculeBrowser
    :: (Action -> Effect Unit) -> Result -> Effect Unit

initializeMoleculeBrowser
    dispatch
    (Result
        { valueCollections
        , molecules
        , pageKind
        }
    )
    = do
        let
            action =
                Action.initializeMoleculeBrowser
                    RequestManager.initialState
                    (map )
                    valueCollections

        dispatch action

