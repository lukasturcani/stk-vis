module RequestManager.RequestManager.Internal.Reducer.Internal.SetSorted.Internal.SortedConstructedMolecules
    ( setSorted
    ) where

import RequestManager.RequestManager.Internal.RequestManager
    as RequestManager

import RequestManager.SetSorted as SetSorted

import RequestManager.RequestManager.Internal.RequestManager.SortedConstructedMolecules
    as SortedConstructedMolecules

setSorted
    :: SortedConstructedMolecules.SortedConstructedMolecules
    -> SetSorted.SetSorted
    -> RequestManager.RequestManager

setSorted
    (SortedConstructedMolecules.SortedConstructedMolecules
        { _url
        , _database
        , _moleculeKey
        , _moleculeCollection
        , _constructedMoleculeCollection
        , _positionMatrixCollection
        , _pageIndex
        , _numEntriesPerPage
        , _ignoredCollections
        , _pageKind
        , _valueCollections
        }
    )
    payload
    = RequestManager.SortedConstructedMolecules
        (SortedConstructedMolecules.SortedConstructedMolecules
            { _url
            , _database
            , _moleculeKey
            , _moleculeCollection
            , _constructedMoleculeCollection
            , _positionMatrixCollection
            , _pageIndex
            , _numEntriesPerPage
            , _ignoredCollections
            , _pageKind
            , _valueCollections
            , _sortedCollection: SetSorted.collection payload
            , _sortType: SetSorted.sortType payload
            }
        )
