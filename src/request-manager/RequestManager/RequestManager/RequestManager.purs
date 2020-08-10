module RequestManager.RequestManager
    ( module Exports
    , reducer
    , initialState
    , nextButtonProps
    , backButtonProps
    , sortButtonProps
    , breadcrumbsProps
    ) where

import RequestManager.Action (Action)
import RequestManager.UpdateMoleculePage (UpdateMoleculePage)

import RequestManager.RequestManager.Internal.RequestManager
    ( RequestManager
    ) as Exports

import RequestManager.RequestManager.Internal.Props
    ( NextButtonProps
    , BackButtonProps
    , SortButtonProps
    , BreadcrumbsProps
    , ActionCreators
    ) as Exports

import RequestManager.RequestManager.Internal.Props
    ( nextButtonProps
    , backButtonProps
    , sortButtonProps
    , breadcrumbsProps
    ) as Props

import RequestManager.RequestManager.Internal.InitialState
    ( initialState
    ) as InitialState

import RequestManager.RequestManager.Internal.Reducer
    ( reducer
    ) as Reducer

reducer :: Exports.RequestManager -> Action -> Exports.RequestManager
reducer = Reducer.reducer

initialState :: Exports.RequestManager
initialState = InitialState.initialState

nextButtonProps
    :: forall a
    .  (UpdateMoleculePage -> a)
    -> Exports.RequestManager
    -> Exports.NextButtonProps a

nextButtonProps = Props.nextButtonProps

backButtonProps
    :: forall a
    .  (UpdateMoleculePage -> a)
    -> Exports.RequestManager
    -> Exports.BackButtonProps a

backButtonProps = Props.backButtonProps

sortButtonProps
    :: forall a r
    .  Exports.ActionCreators a r
    -> Exports.RequestManager
    -> Exports.SortButtonProps a

sortButtonProps = Props.sortButtonProps

breadcrumbsProps
    :: forall a r
    .  Exports.ActionCreators a r
    -> Exports.RequestManager
    -> Exports.BreadcrumbsProps a

breadcrumbsProps = Props.breadcrumbsProps
