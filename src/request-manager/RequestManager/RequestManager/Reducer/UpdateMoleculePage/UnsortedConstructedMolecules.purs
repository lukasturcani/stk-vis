module RequestManager.RequestManager.Internal.Reducer.Internal.UpdateMoleculePage.Internal.UnsortedConstructedMolecules
    ( updateMoleculePage
    ) where

import RequestManager.UpdateMoleculePage as Payload

import RequestManager.RequestManager.Internal.RequestManager.UnsortedConstructedMolecules
    as UnsortedConstructedMolecules

updateMoleculePage
    :: UnsortedConstructedMolecules.UnsortedConstructedMolecules
    -> Payload.UpdateMoleculePage
    -> UnsortedConstructedMolecules.UnsortedConstructedMolecules

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
        , _columns: Payload.columns payload
        }
