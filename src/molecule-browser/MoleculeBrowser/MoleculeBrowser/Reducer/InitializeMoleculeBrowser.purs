module MoleculeBrowser.MoleculeBrowser.Internal.Reducer.Internal.InitializeMoleculeBrowser
    ( initializeMoleculeBrowser
    ) where

import MoleculeBrowser.MoleculeBrowser.Internal.MoleculeBrowser
    ( MoleculeBrowser (..)
    )

import MoleculeBrowser.InitializeMoleculeBrowser
    ( InitializeMoleculeBrowser
    , initializeRequestManager
    , initializeMolecules
    )

import RequestManager.RequestManager
    ( reducer
    ) as RequestManager

import RequestManager.Action
    ( initializeRequestManager
    ) as RequestManager

import Molecules.Molecules
    ( reducer
    ) as Molecules

import Molecules.Action
    ( initializeMolecules
    ) as Molecules

initializeMoleculeBrowser
    :: MoleculeBrowser -> InitializeMoleculeBrowser -> MoleculeBrowser
initializeMoleculeBrowser
    (MoleculeBrowser { _requestManager, _molecules }) payload =
        MoleculeBrowser
            { _requestManager: requestManager
            , _molecules: molecules
            }
  where
    requestManager = RequestManager.reducer
        _requestManager
        (RequestManager.initializeRequestManager
            (initializeRequestManager payload)
        )

    molecules = Molecules.reducer
        _molecules
        (Molecules.initializeMolecules (initializeMolecules payload))

