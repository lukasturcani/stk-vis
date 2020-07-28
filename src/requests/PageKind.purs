module Requests.PageKind
    ( PageKind (..)
    ) where

data PageKind
    = First
    | Middle
    | LastComplete
    | LastIncomplete
    | OnlyComplete
    | OnlyIncomplete
