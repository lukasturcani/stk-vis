module MoleculeBrowser.MoleculeBrowser.Internal.Reducer
    ( reducer
    ) where

import MoleculeBrowser.Action (Action)
import MoleculeBrowser.Payload (Payload (..))

import MoleculeBrowser.MoleculeBrowser.Internal.Reducer.Internal.UpdateMoleculePage
    ( updateMoleculePage
    )

import MoleculeBrowser.MoleculeBrowser.Internal.MoleculeBrowser
    ( MoleculeBrowser
    )

import MoleculeBrowser.MoleculeBrowser.Internal.Reducer.Internal.InitializeMoleculeBrowser
    ( initializeMoleculeBrowser
    )

reducer :: MoleculeBrowser -> Action -> MoleculeBrowser
reducer
    browser
    ({ payload: (UpdateMoleculePage payload) })
    = updateMoleculePage browser payload

reducer
    browser
    ({ payload: (InitializeMoleculeBrowser payload) })
    = initializeMoleculeBrowser browser payload
