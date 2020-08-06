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

import MoleculeBrowser.MoleculeBrowser.Internal.Reducer.Internal.InitializeMoleculeBrowser.SortedAll
    ( initializeSortedAll
    ) as InitializeMoleculeBrowser

import MoleculeBrowser.MoleculeBrowser.Internal.Reducer.Internal.InitializeMoleculeBrowser.SortedBuildingBlocks
    ( initializeSortedBuildingBlocks
    ) as InitializeMoleculeBrowser

import MoleculeBrowser.MoleculeBrowser.Internal.Reducer.Internal.InitializeMoleculeBrowser.SortedConstructedMolecules
    ( initializeSortedConstructedMolecules
    ) as InitializeMoleculeBrowser

import MoleculeBrowser.MoleculeBrowser.Internal.Reducer.Internal.InitializeMoleculeBrowser.UnsortedAll
    ( initializeUnsortedAll
    ) as InitializeMoleculeBrowser

import MoleculeBrowser.MoleculeBrowser.Internal.Reducer.Internal.InitializeMoleculeBrowser.UnsortedBuildingBlocks
    ( initializeUnsortedBuildingBlocks
    ) as InitializeMoleculeBrowser

import MoleculeBrowser.MoleculeBrowser.Internal.Reducer.Internal.InitializeMoleculeBrowser.UnsortedConstructedMolecules
    ( initializeUnsortedConstructedMolecules
    ) as InitializeMoleculeBrowser

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
    = InitializeMoleculeBrowser.initializeUnsortedAll browser payload

reducer
    browser
    ({ payload:
        (InitializeUnsortedBuildingBlocksMoleculeBrowser payload)
    })
    = InitializeMoleculeBrowser.initializeUnsortedBuildingBlocks
        browser
        payload

reducer
    browser
    ({ payload:
        (InitializeUnsortedConstructedMoleculesMoleculeBrowser payload)
    })
    = InitializeMoleculeBrowser.initializeUnsortedConstructedMolecules
        browser
        payload

reducer
    browser
    ({ payload: (InitializeSortedAllMoleculeBrowser payload) })
    = InitializeMoleculeBrowser.initializeSortedAll browser payload

reducer
    browser
    ({ payload:
        (InitializeSortedBuildingBlocksMoleculeBrowser payload)
    })
    = InitializeMoleculeBrowser.initializeSortedBuildingBlocks
        browser
        payload

reducer
    browser
    ({ payload:
        (InitializeSortedConstructedMoleculesMoleculeBrowser payload)
    })
    = InitializeMoleculeBrowser.initializeSortedConstructedMolecules
        browser
        payload
