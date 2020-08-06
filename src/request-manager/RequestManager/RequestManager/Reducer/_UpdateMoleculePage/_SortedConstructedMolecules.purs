module RequestManager.RequestManager.Internal.Reducer._UpdateMoleculePage._SortedConstructedMolecules
    ( updateMoleculePage
    ) where

import RequestManager.UpdateMoleculePage as Payload

import RequestManager.RequestManager.Internal.RequestManager.SortedConstructedMolecules
    as SortedConstructedMolecules

updateMoleculePage
    :: RequestManager.RequestManager
    -> Payload.UpdateMoleculePage
    -> RequestManager.RequestManager

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
