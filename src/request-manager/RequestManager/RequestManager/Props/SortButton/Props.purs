module RequestManager.RequestManager.Internal.Props.Internal.SortButton.Internal.Props
    ( SortButtonProps (..)
    , ActionCreators
    , DispatchAction
    , CollectionName
    ) where

import Prelude
import Effect (Effect)
import Effect.Promise (class Deferred, Promise)
import RequestManager.SortType (SortType)
import RequestManager.SetSorted (SetSorted)
import RequestManager.SetUnsorted (SetUnsorted)
import RequestManager.UpdateMoleculePage (UpdateMoleculePage)

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

    , updateMoleculePage
        :: Deferred => DispatchAction a -> Promise (Effect Unit)
    }

type ActionCreators a r =
    { setSorted          :: SetSorted -> a
    , setUnsorted        :: SetUnsorted -> a
    , updateMoleculePage :: UpdateMoleculePage -> a
    | r
    }
