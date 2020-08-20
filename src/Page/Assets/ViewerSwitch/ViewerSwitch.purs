module Page.ViewerSwitch
    ( Props
    , props
    ) where

import Prelude
import DispatchAction (DispatchAction)
import Effect.Unsafe (unsafePerformEffect)
import Effect.Uncurried (runEffectFn1)

type Props a =
    { state    :: Boolean
    , setState :: DispatchAction a -> Boolean -> Unit
    }

type ActionCreators a r =
    { setState :: Boolean -> a
    | r
    }

props :: forall a r. ActionCreators a r -> Boolean -> Props a
props actionCreators state =
    { state
    , setState: setState actionCreators
    }

setState
    :: forall a r
    .  ActionCreators a r
    -> DispatchAction a
    -> Boolean
    -> Unit

setState actionCreators dispatch state =
    unsafePerformEffect
        (runEffectFn1
            dispatch
            (actionCreators.setState state)
        )
