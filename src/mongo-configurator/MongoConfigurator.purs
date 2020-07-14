module MongoConfigurator
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


import MongoConfigurator.Internal.Data
    ( MongoConfigurator
    , SearchKind
    , RequestState
    ) as Exports

import MongoConfigurator.Internal.Data
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
    ) as Data

import MongoConfigurator.Internal.InitialState as InitialState

initialState :: Exports.MongoConfigurator
initialState = InitialState.initialState

url :: Exports.MongoConfigurator -> String
url = Data.url

moleculeKey :: Exports.MongoConfigurator -> String
moleculeKey = Data.moleculeKey

database :: Exports.MongoConfigurator -> String
database = Data.database

moleculeCollection :: Exports.MongoConfigurator -> String
moleculeCollection = Data.moleculeCollection

constructedMoleculeCollection :: Exports.MongoConfigurator -> String
constructedMoleculeCollection = Data.constructedMoleculeCollection

positionMatrixCollection :: Exports.MongoConfigurator -> String
positionMatrixCollection = Data.positionMatrixCollection

buildingBlockPositionMatrixCollection
    :: Exports.MongoConfigurator -> String
buildingBlockPositionMatrixCollection
    = Data.buildingBlockPositionMatrixCollection

numEntriesPerPage :: Exports.MongoConfigurator -> Int
numEntriesPerPage = Data.numEntriesPerPage

searchKind :: Exports.MongoConfigurator -> Exports.SearchKind
searchKind = Data.searchKind

requestState :: Exports.MongoConfigurator -> Exports.RequestState
requestState = Data.requestState
