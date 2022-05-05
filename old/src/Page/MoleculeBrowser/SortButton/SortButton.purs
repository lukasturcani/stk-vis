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
import Snackbar (Snackbar)

type CollectionName = String

type SetSorted a
    =  Deferred
    => DispatchAction a
    -> Snackbar
    -> CollectionName
    -> SortType
    -> Promise Unit

type SetUnsorted a
    =  Deferred
    => DispatchAction a
    -> Snackbar
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
