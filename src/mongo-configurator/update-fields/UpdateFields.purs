module MongoConfigurator.UpdateFields.UpdateFields
    ( UpdateFields
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

import MongoConfigurator.SearchKind (SearchKind)

import MongoConfigurator.UpdateFields.MongoData
    ( MongoData
    ) as MongoData


data UpdateFields = UpdateFields MongoData.MongoData

updateFields :: MongoData.MongoData -> UpdateFields
updateFields = UpdateFields

url :: UpdateFields -> String
url
    (UpdateFields { url: url' })
    = url'

database :: UpdateFields -> String
database
    (UpdateFields { database: database' })
    = database'

moleculeKey :: UpdateFields -> String
moleculeKey
    (UpdateFields { moleculeKey: moleculeKey' })
    = moleculeKey'

moleculeCollection :: UpdateFields -> String
moleculeCollection
    (UpdateFields { moleculeCollection: collection })
    = collection

constructedMoleculeCollection :: UpdateFields -> String
constructedMoleculeCollection
    (UpdateFields
        { constructedMoleculeCollection: collection
        }
    )
    = collection

positionMatrixCollection :: UpdateFields -> String
positionMatrixCollection
    (UpdateFields { positionMatrixCollection: collection })
    = collection

buildingBlockPositionMatrixCollection :: UpdateFields -> String
buildingBlockPositionMatrixCollection

    (UpdateFields
        { buildingBlockPositionMatrixCollection: collection }
    )
    = collection

numEntriesPerPage :: UpdateFields -> Int
numEntriesPerPage
    (UpdateFields { numEntriesPerPage: numEntries })
    = numEntries

searchKind :: UpdateFields -> SearchKind
searchKind
    (UpdateFields { searchKind: searchKind' })
    = searchKind'
