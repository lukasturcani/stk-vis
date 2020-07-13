module MongoConfigurator.UpdateFields.Internal.Action
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

import MongoConfigurator.UpdateFields.Internal.MongoData
    ( MongoData (MongoData)
    , SearchKind
    )

type Action =
    { type    :: String
    , payload :: MongoData
    }

url :: Action -> String
url
    { payload: (MongoData { url: url' }) }
    = url'

database :: Action -> String
database
    { payload: (MongoData { database: database' }) }
    = database'

moleculeKey :: Action -> String
moleculeKey
    { payload: (MongoData { moleculeKey: moleculeKey' }) }
    = moleculeKey'

moleculeCollection :: Action -> String
moleculeCollection
    { payload: (MongoData { moleculeCollection: collection }) }
    = collection

constructedMoleculeCollection :: Action -> String
constructedMoleculeCollection
    { payload:
        (MongoData
            { constructedMoleculeCollection: collection
            }
        )
    }
    = collection

positionMatrixCollection :: Action -> String
positionMatrixCollection
    { payload: (MongoData { positionMatrixCollection: collection }) }
    = collection

buildingBlockPositionMatrixCollection :: Action -> String
buildingBlockPositionMatrixCollection
    { payload:
        (MongoData
            { buildingBlockPositionMatrixCollection: collection }
        )
    }
    = collection

numEntriesPerPage :: Action -> Number
numEntriesPerPage
    { payload: (MongoData { numEntriesPerPage: numEntries }) }
    = numEntries

searchKind :: Action -> SearchKind
searchKind
    { payload: (MongoData { searchKind: searchKind' }) }
    = searchKind'
