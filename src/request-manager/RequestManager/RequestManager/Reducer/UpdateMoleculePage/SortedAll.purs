module RequestManager.RequestManager.Internal.Reducer.Internal.UpdateMoleculePage.Internal.SortedAll
    ( updateMoleculePage
    ) where

import RequestManager.UpdateMoleculePage as Payload

import RequestManager.RequestManager.Internal.RequestManager.SortedAll
    as SortedAll

updateMoleculePage
    :: SortedAll.SortedAll
    -> Payload.UpdateMoleculePage
    -> SortedAll.SortedAll

updateMoleculePage
    (SortedAll.SortedAll
        { _url
        , _database
        , _moleculeKey
        , _moleculeCollection
        , _constructedMoleculeCollection
        , _positionMatrixCollection
        , _buildingBlockPositionMatrixCollection
        , _numEntriesPerPage
        , _ignoredCollections
        , _sortedCollection
        , _sortType
        }
    )
    payload
    = SortedAll.SortedAll
        { _url
        , _database
        , _moleculeKey
        , _moleculeCollection
        , _constructedMoleculeCollection
        , _positionMatrixCollection
        , _buildingBlockPositionMatrixCollection
        , _pageIndex: Payload.pageIndex payload
        , _numEntriesPerPage
        , _ignoredCollections
        , _sortedCollection
        , _sortType
        , _pageKind: Payload.pageKind payload
        , _valueCollections: Payload.valueCollections payload
        }
