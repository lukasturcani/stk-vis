module RequestManager.RequestManager.Internal.Reducer._UpdateMoleculePage._UnsortedConstructedMolecules
    ( updateMoleculePage
    ) where

import RequestManager.UpdateMoleculePage as Payload

import RequestManager.RequestManager.Internal.RequestManager.UnsortedConstructedMolecules
    as UnsortedConstructedMolecules

updateMoleculePage
    :: RequestManager.RequestManager
    -> Payload.UpdateMoleculePage
    -> RequestManager.RequestManager

updateMoleculePage
    (UnsortedConstructedMolecules.UnsortedConstructedMolecules
        { _url
        , _database
        , _moleculeKey
        , _moleculeCollection
        , _constructedMoleculeCollection
        , _positionMatrixCollection
        , _numEntriesPerPage
        , _ignoredCollections
        }
    )
    payload
    = UnsortedConstructedMolecules.UnsortedConstructedMolecules
        { _url
        , _database
        , _moleculeKey
        , _moleculeCollection
        , _constructedMoleculeCollection
        , _positionMatrixCollection
        , _pageIndex: Payload.pageIndex payload
        , _numEntriesPerPage
        , _ignoredCollections
        , _pageKind: Payload.pageKind payload
        }
