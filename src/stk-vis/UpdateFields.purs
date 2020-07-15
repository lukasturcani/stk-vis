module StkVis.UpdateFields
    ( UpdateFields
    , SearchKind
    , toConfigurator
    , updateFields
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
import MongoConfigurator.UpdateFields.MongoData as MongoData
import MongoConfigurator.UpdateFields.UpdateFields as UpdateFields

newtype UpdateFields = UpdateFields UpdateFields.UpdateFields

newtype SearchKind = SearchKind MongoData.SearchKind

toConfigurator :: UpdateFields -> UpdateFields.UpdateFields
toConfigurator (UpdateFields update) = update

updateFields :: MongoData -> UpdateFields
updateFields = UpdateFields <<< UpdateFields.updateFields

url :: UpdateFields -> String
url
    (UpdateFields update)
    = UpdateFields.url update

database :: UpdateFields -> String
database
    (UpdateFields update)
    = UpdateFields.database update

moleculeKey :: UpdateFields -> String
moleculeKey
    (UpdateFields update)
    = UpdateFields.moleculeKey update

moleculeCollection :: UpdateFields -> String
moleculeCollection
    (UpdateFields update)
    = UpdateFields.moleculeCollection update

constructedMoleculeCollection :: UpdateFields -> String
constructedMoleculeCollection
    (UpdateFields update)
    = UpdateFields.constructedMoleculeCollection update

positionMatrixCollection :: UpdateFields -> String
positionMatrixCollection
    (UpdateFields update)
    = UpdateFields.positionMatrixCollection update

buildingBlockPositionMatrixCollection :: UpdateFields -> String
buildingBlockPositionMatrixCollection
    (UpdateFields update)
    = UpdateFields.buildingBlockPositionMatrixCollection update

numEntriesPerPage :: UpdateFields -> Int
numEntriesPerPage
    (UpdateFields update)
    = UpdateFields.numEntriesPerPage update

searchKind :: UpdateFields -> SearchKind
searchKind
    (UpdateFields update)
    = SearchKind $ UpdateFields.searchKind update
