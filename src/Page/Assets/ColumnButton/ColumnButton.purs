module Page.ColumnButton
    ( Props
    , CollectionCheckboxProps
    , props
    ) where

import Prelude
import Data.HashSet (HashSet)
import Data.HashSet as HashSet
import Data.Array as Array
import Data.String as String
import DispatchAction (DispatchAction)
import Effect.Unsafe (unsafePerformEffect)
import Effect.Uncurried (runEffectFn1)

type CollectionCheckboxProps =
    { isChecked :: Boolean
    , label     :: String
    }


type Props a =
    { collections    :: Array CollectionCheckboxProps
    , hideCollection :: DispatchAction a -> String -> Unit
    , showCollection :: DispatchAction a -> String -> Unit
    }

type ActionCreators a r =
    { hideCollection :: String -> a
    , showCollection :: String -> a
    | r
    }

props
    :: forall a r
    .  ActionCreators a r
    -> HashSet String
    -> HashSet String
    -> Props a

props actionCreators ignoredCollections collections =
    { collections: checkboxProps
    , hideCollection: hideCollection actionCreators
    , showCollection: showCollection actionCreators
    }

  where

    sortedCollections =
        Array.sortWith String.toLower $
        Array.fromFoldable collections

    checkboxProps :: Array CollectionCheckboxProps
    checkboxProps = do
        collection <- sortedCollections
        pure
            { isChecked:
                not $ collection `HashSet.member` ignoredCollections
            , label: collection
            }

hideCollection
    :: forall a r
    .  ActionCreators a r
    -> DispatchAction a
    -> String
    -> Unit

hideCollection actionCreators dispatch collection =
    unsafePerformEffect
        (runEffectFn1
            dispatch
            (actionCreators.hideCollection collection)
        )

showCollection
    :: forall a r
    .  ActionCreators a r
    -> DispatchAction a
    -> String
    -> Unit

showCollection actionCreators dispatch collection =
    unsafePerformEffect
        (runEffectFn1
            dispatch
            (actionCreators.showCollection collection)
        )
