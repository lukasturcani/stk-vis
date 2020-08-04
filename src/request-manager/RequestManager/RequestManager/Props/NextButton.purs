module RequestManager.RequestManager.Internal.Props.Internal.NextButton
    ( NextButtonProps
    , nextButtonProps
    ) where

import RequestManager.RequestResult (RequestResult)
import RequestManager.PageKind (PageKind (..))
import Effect.Promise (Promise)

import RequestManager.RequestManager.Internal.RequestManager
    ( RequestManager (..)
    , _pageKind
    )

import RequestManager.RequestManager.Internal.RequestManager.UnsortedAll
    as UnsortedAll

import RequestManager.RequestManager.Internal.RequestManager.UnsortedBuildingBlocks
    as UnsortedBuildingBlocks

import RequestManager.RequestManager.Internal.RequestManager.UnsortedConstructedMolecules
    as UnsortedConstructedMolecules

import RequestManager.RequestManager.Internal.RequestManager.SortedAll
    as SortedAll

import RequestManager.RequestManager.Internal.RequestManager.SortedBuildingBlocks
    as SortedBuildingBlocks

import RequestManager.RequestManager.Internal.RequestManager.SortedConstructedMolecules
    as SortedConstructedMolecules

data NextButtonProps = NextButtonProps
    { lastPage     :: Boolean
    , request      :: Promise RequestResult
    }

nextButtonProps :: RequestManager -> NextButtonProps
nextButtonProps manager = NextButtonProps
    { lastPage: _lastPage (_pageKind manager)
    , request:  _request manager
    }

_lastPage :: PageKind -> Boolean
_lastPage LastComplete   = true
_lastPage LastIncomplete = true
_lastPage OnlyComplete   = true
_lastPage OnlyIncomplete = true
_lastPage _              = false

_request :: RequestManager -> Promise RequestResult

_request (UnsortedAll manager)
    = UnsortedAll._nextRequest manager

_request (UnsortedBuildingBlocks manager)
    = UnsortedBuildingBlocks._nextRequest manager

_request (UnsortedConstructedMolecules manager)
    = UnsortedConstructedMolecules._nextRequest manager

_request (SortedAll manager)
    = SortedAll._nextRequest manager

_request (SortedBuildingBlocks manager)
    = SortedBuildingBlocks._nextRequest manager

_request (SortedConstructedMolecules manager)
    = SortedConstructedMolecules._nextRequest manager
