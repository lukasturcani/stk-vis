module RequestManager.RequestManager.Internal.Reducer.Internal.InitializeUnsortedConstructedMolecules
    ( initializeUnsortedConstructedMolecules
    ) where

import RequestManager.InitializeUnsortedConstructedMolecules as Payload

import RequestManager.RequestManager.Internal.RequestManager
    ( RequestManager (UnsortedConstructedMolecules)
    ) as RequestManager

import RequestManager.RequestManager.Internal.RequestManager.UnsortedConstructedMolecules
    as UnsortedConstructedMolecules

initializeUnsortedConstructedMolecules
    :: RequestManager.RequestManager
    -> Payload.InitializeUnsortedConstructedMolecules
    -> RequestManager.RequestManager

initializeUnsortedConstructedMolecules _ payload
    = RequestManager.UnsortedConstructedMolecules
        unsortedConstructedMolecules
  where
    unsortedConstructedMolecules
        = UnsortedConstructedMolecules.UnsortedConstructedMolecules
            { _url: (Payload.url payload)
            , _database: (Payload.database payload)
            , _moleculeKey: (Payload.moleculeKey payload)
            , _moleculeCollection: (Payload.moleculeCollection payload)
            , _constructedMoleculeCollection:
                (Payload.constructedMoleculeCollection payload)

            , _positionMatrixCollection:
                (Payload.positionMatrixCollection payload)

            , _pageIndex: (Payload.pageIndex payload)
            , _numEntriesPerPage: (Payload.numEntriesPerPage payload)
            , _ignoredCollections: (Payload.ignoredCollections payload)
            , _pageKind: (Payload.pageKind payload)
            , _valueCollections: Payload.valueCollections payload
            }
