module Page.MoleculeBrowser.SortButton
    ( Props
    , SetSorted
    , SetUnsorted
    , CollectionName
    , props
    ) where

import Prelude
import DispatchAction (DispatchAction)
import SortType (SortType)
import Effect.Promise (class Deferred, Promise)

type CollectionName = String

type SetSorted a
    =  Deferred
    => DispatchAction a
    -> CollectionName
    -> SortType
    -> Promise Unit

type SetUnsorted a
    =  Deferred
    => DispatchAction a
    -> Promise Unit

type Props a =
    { collections :: Array String
    , setSorted   :: SetSorted a
    , setUnsorted :: SetUnsorted a
    }

props
    :: forall a
    .  Array String
    -> SetSorted a
    -> SetUnsorted a
    -> Props a

props collections setSorted setUnsorted =
    { collections
    , setSorted
    , setUnsorted
    }
