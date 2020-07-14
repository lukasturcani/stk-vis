module StkVis.UpdateFields.Internal.Action
    ( Action (..)
    , SearchKind
    , toConfigurator
    , url
    , database
    , moleculeKey
    , moleculeCollection
    , constructedMoleculeCollection
    , positionMatrixCollection
    , buildingBlockPositionMatrixCollection
    , numEntriesPerPage
    , searchKind
    ) where

import Prelude
import MongoConfigurator.UpdateFields as UpdateFields

newtype Action = Action UpdateFields.Action

newtype SearchKind = SearchKind UpdateFields.SearchKind

toConfigurator :: Action -> UpdateFields.Action
toConfigurator (Action action) = action

url :: Action -> String
url
    (Action action)
    = UpdateFields.url action

database :: Action -> String
database
    (Action action)
    = UpdateFields.database action

moleculeKey :: Action -> String
moleculeKey
    (Action action)
    = UpdateFields.moleculeKey action

moleculeCollection :: Action -> String
moleculeCollection
    (Action action)
    = UpdateFields.moleculeCollection action

constructedMoleculeCollection :: Action -> String
constructedMoleculeCollection
    (Action action)
    = UpdateFields.constructedMoleculeCollection action

positionMatrixCollection :: Action -> String
positionMatrixCollection
    (Action action)
    = UpdateFields.positionMatrixCollection action

buildingBlockPositionMatrixCollection :: Action -> String
buildingBlockPositionMatrixCollection
    (Action action)
    = UpdateFields.buildingBlockPositionMatrixCollection action

numEntriesPerPage :: Action -> Int
numEntriesPerPage
    (Action action)
    = UpdateFields.numEntriesPerPage action

searchKind :: Action -> SearchKind
searchKind
    (Action action)
    = SearchKind $ UpdateFields.searchKind action
