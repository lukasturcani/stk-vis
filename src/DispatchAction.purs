module DispatchAction
    ( DispatchAction
    ) where

import Prelude
import Effect.Uncurried (EffectFn1)

type DispatchAction a = EffectFn1 a Unit
