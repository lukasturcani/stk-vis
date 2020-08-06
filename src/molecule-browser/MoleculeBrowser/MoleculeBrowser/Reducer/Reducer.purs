module MoleculeBrowser.MoleculeBrowser.Internal.Reducer
    ( reducer
    ) where

import MoleculeBrowser.Action (Action)
import MoleculeBrowser.Payload (Payload (..))

import MoleculeBrowser.MoleculeBrowser.Internal.Reducer.Internal.UpdateMoleculePage
    ( updateMoleculePage
    )

import MoleculeBrowser.MoleculeBrowser.Internal.Reducer.Internal.InitializeMolecules
    ( initializeMolecules
    )

import MoleculeBrowser.MoleculeBrowser.Internal.Reducer.Internal.SetSorted
    ( setSorted
    )

import MoleculeBrowser.MoleculeBrowser.Internal.Reducer.Internal.SetUnsorted
    ( setUnsorted
    )

import MoleculeBrowser.MoleculeBrowser.Internal.MoleculeBrowser
    ( MoleculeBrowser
    )

reducer :: MoleculeBrowser -> Action -> MoleculeBrowser
reducer
    browser
    ({ payload: (UpdateMoleculePage payload) })
    = updateMoleculePage browser payload

reducer
    browser
    ({ payload: (InitializeMolecules payload) })
    = initializeMolecules browser payload

reducer
    browser
    ({ payload: (SetSorted payload) })
    = setSorted browser payload

reducer
    browser
    ({ payload: (SetUnsorted payload) })
    = setUnsorted browser payload

reducer
    browser
    ({ payload: (InitializeUnsortedAllMoleculeBrowser payload) })
    = MoleculeBrowser.initializeUnsortedAll browser payload

reducer
    browser
    ({ payload:
        (InitializeUnsortedBuildingBlocksMoleculeBrowser payload)
    })
    = MoleculeBrowser.initializeUnsortedBuildingBlocks browser payload
