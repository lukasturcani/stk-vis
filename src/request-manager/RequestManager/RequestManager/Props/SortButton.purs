module RequestManager.RequestManager.Internal.Props.Internal.SortButton
    ( SortButtonProps
    , DispatchAction
    , CollectionName
    , ActionCreators
    , sortButtonProps
    ) where

import RequestManager.RequestManager.Internal.RequestManager
    ( RequestManager
    , valueCollections
    )

import Prelude
import RequestManager.SetSorted (SetSorted, setSorted)
import RequestManager.SetUnsorted (SetUnsorted, setUnsorted)
import RequestManager.SortType (SortType)
import Effect (Effect)


type DispatchAction a = a -> Effect Unit
type CollectionName = String

data SortButtonProps a = SortButtonProps
    { collections :: Array String

    , setSorted
        :: DispatchAction a
        -> CollectionName
        -> SortType
        -> Effect Unit

    , setUnsorted :: DispatchAction a -> Effect Unit

    }

type ActionCreators a r =
    { setSorted   :: SetSorted -> a
    , setUnsorted :: SetUnsorted -> a
    | r
    }

sortButtonProps
    :: forall a r
    .  ActionCreators a r -> RequestManager -> SortButtonProps a

sortButtonProps actionCreators requestManager = SortButtonProps
    { collections: valueCollections requestManager
    , setSorted: setSorted'
    , setUnsorted: setUnsorted'
    }
  where
    setSorted' dispatch collection sortType
        = dispatch
            (actionCreators.setSorted
                (setSorted collection sortType)
            )

    setUnsorted' dispatch
        = dispatch (actionCreators.setUnsorted setUnsorted)

