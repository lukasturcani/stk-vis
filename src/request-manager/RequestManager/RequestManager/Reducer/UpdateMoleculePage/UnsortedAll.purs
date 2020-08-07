module RequestManager.RequestManager.Internal.Reducer.Internal.UpdateMoleculePage.Internal.UnsortedAll
    ( updateMoleculePage
    ) where

import RequestManager.UpdateMoleculePage as Payload

import RequestManager.RequestManager.Internal.RequestManager.UnsortedAll
    as UnsortedAll

updateMoleculePage
    :: UnsortedAll.UnsortedAll
    -> Payload.UpdateMoleculePage
    -> UnsortedAll.UnsortedAll

updateMoleculePage
    (UnsortedAll.UnsortedAll
        { _url
        , _database
        , _moleculeKey
        , _moleculeCollection
        , _positionMatrixCollection
        , _buildingBlockPositionMatrixCollection
        , _numEntriesPerPage
        , _ignoredCollections
        }
    )
    payload
    = UnsortedAll.UnsortedAll
        { _url
        , _database
        , _moleculeKey
        , _moleculeCollection
        , _positionMatrixCollection
        , _buildingBlockPositionMatrixCollection
        , _pageIndex: Payload.pageIndex payload
        , _numEntriesPerPage
        , _ignoredCollections
        , _pageKind: Payload.pageKind payload
        , _columns: Payload.columns payload
        }
