module MongoConfigurator.MongoConfigurator
    ( module Exports
    , initialState
    , url
    , moleculeKey
    , database
    , moleculeCollection
    , constructedMoleculeCollection
    , positionMatrixCollection
    , buildingBlockPositionMatrixCollection
    , numEntriesPerPage
    , searchKind
    , requestState
    ) where


import MongoConfigurator.MongoConfigurator.Internal.MongoConfigurator
    ( MongoConfigurator
    , SearchKind (..)
    , RequestState (..)
    ) as Exports

import MongoConfigurator.MongoConfigurator.Internal.MongoConfigurator
    ( url
    , moleculeKey
    , database
    , moleculeCollection
    , constructedMoleculeCollection
    , positionMatrixCollection
    , buildingBlockPositionMatrixCollection
    , numEntriesPerPage
    , searchKind
    , requestState
    ) as Internal

import MongoConfigurator.MongoConfigurator.Internal.InitialState
    ( initialState
    ) as InitialState

import MongoConfigurator.MongoConfigurator.Internal.Reducer
    ( reducer
    ) as Exports

initialState :: Exports.MongoConfigurator
initialState = InitialState.initialState

url :: Exports.MongoConfigurator -> String
url = Internal.url

moleculeKey :: Exports.MongoConfigurator -> String
moleculeKey = Internal.moleculeKey

database :: Exports.MongoConfigurator -> String
database = Internal.database

moleculeCollection :: Exports.MongoConfigurator -> String
moleculeCollection = Internal.moleculeCollection

constructedMoleculeCollection :: Exports.MongoConfigurator -> String
constructedMoleculeCollection = Internal.constructedMoleculeCollection

positionMatrixCollection :: Exports.MongoConfigurator -> String
positionMatrixCollection = Internal.positionMatrixCollection

buildingBlockPositionMatrixCollection
    :: Exports.MongoConfigurator -> String
buildingBlockPositionMatrixCollection
    = Internal.buildingBlockPositionMatrixCollection

numEntriesPerPage :: Exports.MongoConfigurator -> Int
numEntriesPerPage = Internal.numEntriesPerPage

searchKind :: Exports.MongoConfigurator -> Exports.SearchKind
searchKind = Internal.searchKind

requestState :: Exports.MongoConfigurator -> Exports.RequestState
requestState = Internal.requestState
