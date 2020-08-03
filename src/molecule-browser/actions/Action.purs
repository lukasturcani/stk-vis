module MoleculeBrowser.Action
    ( Action
    , initializeMoleculeBrowser
    , updateMoleculePage
    ) where

import MoleculeBrowser.UpdateMoleculePage.UpdateMoleculePage
    ( UpdateMoleculePage
    )

import MoleculeBrowser.InitializeMoleculeBrowser
    ( InitializeMoleculeBrowser
    )

import MoleculeBrowser.Payload
    ( Payload
    , updateMoleculePage
    , initializeMoleculeBrowser
    ) as Payload

type Action =
    { type    :: String
    , payload :: Payload.Payload
    }

updateMoleculePage :: UpdateMoleculePage -> Action
updateMoleculePage payload =
    { type: "UPDATE_MOLECULE_PAGE"
    , payload: Payload.updateMoleculePage payload
    }

initializeMoleculeBrowser :: InitializeMoleculeBrowser -> Action
initializeMoleculeBrowser payload =
    { type: "INITIALIZE_MOLECULE_BROWSER"
    , payload: Payload.initializeMoleculeBrowser payload
    }
