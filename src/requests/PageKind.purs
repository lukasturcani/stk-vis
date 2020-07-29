module Requests.PageKind
    ( PageKind (..)
    , pageKind
    ) where

import Prelude

data PageKind
    = First
    | Middle
    | LastComplete
    | LastIncomplete
    | OnlyComplete
    | OnlyIncomplete


type NumResults = Int
type PageIndex = Int
type NumEntriesPerPage = Int


pageKind :: NumResults -> PageIndex -> NumEntriesPerPage -> PageKind
pageKind numResults pageIndex numEntriesPerPage
    = pageKindImpl
        (pageIndex == 0)
        (numResults <= numEntriesPerPage)
        (numResults < numEntriesPerPage)

type IsFirstPage  = Boolean
type IsLastPage   = Boolean
type IsIncomplete = Boolean

pageKindImpl :: IsFirstPage -> IsLastPage -> IsIncomplete -> PageKind
pageKindImpl true  true  true  = OnlyIncomplete
pageKindImpl true  true  false = OnlyComplete
pageKindImpl true  false _     = First
pageKindImpl false true  true  = LastIncomplete
pageKindImpl false true  false = LastComplete
pageKindImpl false false _     = Middle
