module StkVis.UpdateFields.Internal.Action
    ( Action (..)
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

import StkVis.UpdateFields.Internal.MongoData
    ( MongoData (MongoData)
    , SearchKind
    )

data Action = Action MongoData

url :: Action -> String
url
    (Action (MongoData { url: url' }))
    = url'

database :: Action -> String
database
    (Action (MongoData { database: database' }))
    = database'

moleculeKey :: Action -> String
moleculeKey
    (Action (MongoData { moleculeKey: moleculeKey' }))
    = moleculeKey'

moleculeCollection :: Action -> String
moleculeCollection
    (Action (MongoData { moleculeCollection: collection }))
    = collection

constructedMoleculeCollection :: Action -> String
constructedMoleculeCollection
    (Action (MongoData { constructedMoleculeCollection: collection }))
    = collection

positionMatrixCollection :: Action -> String
positionMatrixCollection
    (Action (MongoData { positionMatrixCollection: collection }))
    = collection

buildingBlockPositionMatrixCollection :: Action -> String
buildingBlockPositionMatrixCollection
    (Action
        (MongoData { buildingBlockPositionMatrixCollection: collection }
        )
    )
    = collection

numEntriesPerPage :: Action -> Number
numEntriesPerPage
    (Action (MongoData { numEntriesPerPage: numEntries }))
    = numEntries

searchKind :: Action -> SearchKind
searchKind
    (Action (MongoData { searchKind: searchKind' }))
    = searchKind'
