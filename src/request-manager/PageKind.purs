module RequestManager.PageKind
    ( PageKind (..)
    , first
    , middle
    , lastComplete
    , lastIncomplete
    , onlyComplete
    , onlyIncomplete
    , fromRequest
    ) where

import Requests.PageKind as Request

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

fromRequest :: Request.PageKind -> PageKind
fromRequest Request.First = First
fromRequest Request.Middle = Middle
fromRequest Request.LastComplete = LastComplete
fromRequest Request.LastIncomplete = LastIncomplete
fromRequest Request.OnlyComplete = OnlyComplete
fromRequest Request.OnlyIncomplete = OnlyIncomplete
