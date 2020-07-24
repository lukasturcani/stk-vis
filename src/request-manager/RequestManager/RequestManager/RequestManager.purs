module RequestManager.RequestManager
    ( module Exports
    , initialState
    , nextButtonProps
    , backButtonProps
    , sortButtonProps
    ) where

import RequestManager.RequestManager.Internal.RequestManager
    ( RequestManager
    ) as Exports

import RequestManager.RequestManager.Internal.Props
    ( NextButtonProps
    , BackButtonProps
    , SortButtonProps
    ) as Exports

import RequestManager.RequestManager.Internal.Props
    ( nextButtonProps
    , backButtonProps
    , sortButtonProps
    ) as Props

import RequestManager.RequestManager.Internal.InitialState
    ( initialState
    ) as InitialState

initialState :: Exports.RequestManager
initialState = InitialState.initialState

nextButtonProps :: Exports.RequestManager -> Exports.NextButtonProps
nextButtonProps = Props.nextButtonProps

backButtonProps :: Exports.RequestManager -> Exports.BackButtonProps
backButtonProps = Props.backButtonProps

sortButtonProps :: Exports.RequestManager -> Exports.SortButtonProps
sortButtonProps = Props.sortButtonProps
