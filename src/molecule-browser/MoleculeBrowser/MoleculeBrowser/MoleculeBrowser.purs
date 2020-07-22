module MoleculeBrowser.MoleculeBrowser
    ( module Exports
    , initialState
    , reducer
    , props
    ) where

import MoleculeBrowser.MoleculeBrowser.Internal.MoleculeBrowser
    ( MoleculeBrowser
    ) as Exports

import MoleculeBrowser.MoleculeBrowser.Internal.Reducer
    ( reducer
    ) as Reducer

import MoleculeBrowser.MoleculeBrowser.Internal.Props
    ( Props
    ) as Exports

import MoleculeBrowser.MoleculeBrowser.Internal.Props
    ( props
    ) as Props

import MoleculeBrowser.MoleculeBrowser.Internal.InitialState
    ( initialState
    ) as InitialState

import MoleculeBrowser.Action (Action)


initialState :: Exports.MoleculeBrowser
initialState = InitialState.initialState

reducer :: Exports.MoleculeBrowser -> Action -> Exports.MoleculeBrowser
reducer = Reducer.reducer

props :: Exports.MoleculeBrowser -> Exports.Props
props = Props.props
