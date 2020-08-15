module PageKind
    ( PageKind (..)
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

fromRequest :: Request.PageKind -> PageKind
fromRequest Request.First = First
fromRequest Request.Middle = Middle
fromRequest Request.LastComplete = LastComplete
fromRequest Request.LastIncomplete = LastIncomplete
fromRequest Request.OnlyComplete = OnlyComplete
fromRequest Request.OnlyIncomplete = OnlyIncomplete
