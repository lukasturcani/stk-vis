module RequestManager.PageKind
    ( PageKind (..)
    ) where

import Prelude

data PageKind
    = First
    | Middle
    | LastComplete
    | LastIncomplete
    | OnlyComplete
    | OnlyIncomplete
