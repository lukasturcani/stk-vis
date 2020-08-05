module RequestManager.RequestManager.Internal.Reducer.Internal.SetSorted.Internal.UnsortedConstructedMolecules
    ( setSorted
    ) where

import RequestManager.RequestManager.Internal.RequestManager
    as RequestManager

import RequestManager.SetSorted as SetSorted

import RequestManager.RequestManager.Internal.RequestManager.SortedConstructedMolecules
    as SortedConstructedMolecules

import RequestManager.RequestManager.Internal.RequestManager.UnsortedConstructedMolecules
    as UnsortedConstructedMolecules

setSorted
    :: UnsortedConstructedMolecules.UnsortedConstructedMolecules
    -> SetSorted.SetSorted
    -> RequestManager.RequestManager

setSorted
    (UnsortedConstructedMolecules.UnsortedConstructedMolecules
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
            , _sortedCollection: SetSorted.collection payload
            , _sortType: SetSorted.sortType payload
            }
        )
