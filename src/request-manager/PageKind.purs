module RequestManager.PageKind
    ( PageKind (..)
    , first
    , middle
    , lastComplete
    , lastIncomplete
    , onlyComplete
    , onlyIncomplete
    ) where

import Prelude

data PageKind
    = First
    | Middle
    | LastComplete
    | LastIncomplete
    | OnlyComplete
    | OnlyIncomplete

first :: PageKind
first = First

middle :: PageKind
middle = Middle

lastComplete :: PageKind
lastComplete = LastComplete

lastIncomplete :: PageKind
lastIncomplete = LastIncomplete

onlyComplete :: PageKind
onlyComplete = OnlyComplete

onlyIncomplete :: PageKind
onlyIncomplete = OnlyIncomplete
