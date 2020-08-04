module RequestManager.RequestManager.Internal.Reducer.Internal.InitializeSortedConstructedMolecules
    ( initializeSortedConstructedMolecules
    ) where

import RequestManager.InitializeSortedConstructedMolecules as Payload

import RequestManager.RequestManager.Internal.RequestManager
    ( RequestManager (SortedConstructedMolecules)
    ) as RequestManager

import RequestManager.RequestManager.Internal.RequestManager.SortedConstructedMolecules
    as SortedConstructedMolecules

initializeSortedConstructedMolecules
    :: RequestManager.RequestManager
    -> Payload.InitializeSortedConstructedMolecules
    -> RequestManager.RequestManager

initializeSortedConstructedMolecules _ payload
    = RequestManager.SortedConstructedMolecules
        sortedConstructedMolecules
  where
    sortedConstructedMolecules
        = SortedConstructedMolecules.SortedConstructedMolecules
            { _url: Payload.url payload
            , _database: Payload.database payload
            , _moleculeKey: Payload.moleculeKey payload
            , _moleculeCollection: Payload.moleculeCollection payload
            , _constructedMoleculeCollection:
                Payload.constructedMoleculeCollection payload

            , _positionMatrixCollection:
                Payload.positionMatrixCollection payload

            , _pageIndex: Payload.pageIndex payload
            , _numEntriesPerPage: Payload.numEntriesPerPage payload
            , _ignoredCollections: Payload.ignoredCollections payload
            , _pageKind: Payload.pageKind payload
            , _sortedCollection: Payload.sortedCollection payload
            , _sortType: Payload.sortType payload
            }
