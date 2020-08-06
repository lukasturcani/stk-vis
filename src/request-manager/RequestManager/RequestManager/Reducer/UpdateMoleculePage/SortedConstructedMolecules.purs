module RequestManager.RequestManager.Internal.Reducer.Internal.UpdateMoleculePage.Internal.SortedConstructedMolecules
    ( updateMoleculePage
    ) where

import RequestManager.UpdateMoleculePage as Payload

import RequestManager.RequestManager.Internal.RequestManager.SortedConstructedMolecules
    as SortedConstructedMolecules

updateMoleculePage
    :: SortedConstructedMolecules.SortedConstructedMolecules
    -> Payload.UpdateMoleculePage
    -> SortedConstructedMolecules.SortedConstructedMolecules

updateMoleculePage
    (SortedConstructedMolecules.SortedConstructedMolecules
        { _url
        , _database
        , _moleculeKey
        , _moleculeCollection
        , _constructedMoleculeCollection
        , _positionMatrixCollection
        , _numEntriesPerPage
        , _ignoredCollections
        , _sortedCollection
        , _sortType
        }
    )
    payload
    = SortedConstructedMolecules.SortedConstructedMolecules
        { _url
        , _database
        , _moleculeKey
        , _moleculeCollection
        , _constructedMoleculeCollection
        , _positionMatrixCollection
        , _pageIndex: Payload.pageIndex payload
        , _numEntriesPerPage
        , _ignoredCollections
        , _sortedCollection
        , _sortType
        , _pageKind: Payload.pageKind payload
        }
