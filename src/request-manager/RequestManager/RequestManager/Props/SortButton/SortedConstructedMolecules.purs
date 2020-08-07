module RequestManager.RequestManager.Internal.Props.Internal.SortButton.Internal.SortedConstructedMolecules
    ( sortButtonProps
    ) where

import RequestManager.RequestManager.Internal.Props.Internal.SortButton.Internal.Props
    ( SortButtonProps (SortButtonProps)
    , ActionCreators
    )

import RequestManager.RequestManager.Internal.RequestManager.SortedConstructedMolecules
    ( SortedConstructedMolecules (SortedConstructedMolecules)
    )

import Prelude
import Data.Array as Array
import Requests.SortedConstructedMolecules as Request
import RequestManager.SetSorted (setSorted)
import RequestManager.SetUnsorted (setUnsorted)
import RequestManager.UpdateMoleculePage (updateMoleculePage)
import Effect.Promise (class Deferred, Promise)
import RequestManager.SetSorted (setSorted)
import RequestManager.SetUnsorted (setUnsorted)
import RequestManager.SortType (toRequest)
import RequestManager.PageKind (fromRequest)
import Effect (Effect)

sortButtonProps
    :: forall a r
    .  ActionCreators a r
    -> SortedConstructedMolecules
    -> SortButtonProps a

sortButtonProps
    actionCreators
    (SortedConstructedMolecules
        { _url: url
        , _database: database
        , _moleculeKey: moleculeKey
        , _moleculeCollection: moleculeCollection
        , _constructedMoleculeCollection: constructedMoleculeCollection
        , _positionMatrixCollection: positionMatrixCollection
        , _pageIndex
        , _numEntriesPerPage: numEntriesPerPage
        , _ignoredCollections: ignoredCollections
        , _pageKind: pageKind
        , _sortedCollection: sortedCollection
        , _sortType: sortType
        , _valueCollections
        }
    )
    = SortButtonProps
    { collections: _valueCollections
    , setSorted: setSorted'
    , setUnsorted: setUnsorted'
    , updateMoleculePage: updateMoleculePage'
    }
  where
    setSorted' dispatch collection sortType'
        = dispatch
            (actionCreators.setSorted
                (setSorted collection sortType')
            )

    setUnsorted' dispatch
        = dispatch (actionCreators.setUnsorted setUnsorted)

    pageIndex = 0

    request :: Deferred => Promise Request.Result
    request = Request.request
        { url
        , database
        , moleculeKey
        , moleculeCollection
        , constructedMoleculeCollection
        , positionMatrixCollection
        , pageIndex
        , numEntriesPerPage
        , ignoredCollections
        , sortedCollection
        , sortType: toRequest sortType
        }


    updateMoleculePage'
        :: Deferred => (a -> Effect Unit) -> Promise (Effect Unit)
    updateMoleculePage' dispatch = do
        result <- request

        let
            (Request.Result
                { valueCollections, molecules, pageKind: pageKind' }
            ) = result

            payload = updateMoleculePage
                { columns:
                    Array.concat [[moleculeKey], valueCollections]
                , moleculeKey
                , molecules
                , pageIndex
                , pageKind: fromRequest pageKind'
                , valueCollections
                }

        pure (dispatch (actionCreators.updateMoleculePage payload))