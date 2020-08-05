module RequestManager.RequestManager.Internal.Reducer.Internal.SetUnsorted.Internal.SortedConstructedMolecules
    ( setUnsorted
    ) where

import RequestManager.RequestManager.Internal.RequestManager
    as RequestManager

import RequestManager.SetUnsorted as SetUnsorted

import RequestManager.RequestManager.Internal.RequestManager.SortedConstructedMolecules
    as SortedConstructedMolecules

import RequestManager.RequestManager.Internal.RequestManager.UnsortedConstructedMolecules
    as UnsortedConstructedMolecules

setUnsorted
    :: SortedConstructedMolecules.SortedConstructedMolecules
    -> SetUnsorted.SetUnsorted
    -> RequestManager.RequestManager

setUnsorted
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
        }
    )
    payload
    = RequestManager.UnsortedConstructedMolecules
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
