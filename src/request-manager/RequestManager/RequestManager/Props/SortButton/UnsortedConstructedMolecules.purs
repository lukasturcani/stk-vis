module RequestManager.RequestManager.Internal.Props.Internal.SortButton.Internal.UnsortedAll
    ( sortButtonProps
    ) where

import RequestManager.RequestManager.Internal.Props.Internal.SortButton.Internal.Props
    ( SortButtonProps (SortButtonProps)
    )

import RequestManager.RequestManager.Internal.RequestManager.UnsortedConstructedMolecules
    ( UnsortedConstructedMolecules (UnsortedConstructedMolecules)
    )

import Requests.UnsortedConstructedMolecules as Request

sortButtonProps
    :: forall a r
    .  ActionCreators a r
    -> UnsortedConstructedMolecules
    -> SortButtonProps a

sortButtonProps
    actionCreators
    (UnsortedConstructedMolecules
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
        }
    )
    = SortButtonProps
    { collections: valueCollections requestManager
    , setUnsorted: setUnsorted'
    , setUnsorted: setUnsorted'
    , updateMoleculePage: updateMoleculePage'
    }
  where
    setUnsorted' dispatch collection sortType
        = dispatch
            (actionCreators.setUnsorted
                (setUnsorted collection sortType)
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
