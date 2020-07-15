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
    ( MongoData
    , SearchKind
    )

type Action =
    { type    :: String
    , payload :: MongoData
    }

url :: Action -> String
url
    { payload: ({ url: url' }) }
    = url'

database :: Action -> String
database
    { payload: ({ database: database' }) }
    = database'

moleculeKey :: Action -> String
moleculeKey
    { payload: ({ moleculeKey: moleculeKey' }) }
    = moleculeKey'

moleculeCollection :: Action -> String
moleculeCollection
    { payload: ({ moleculeCollection: collection }) }
    = collection

constructedMoleculeCollection :: Action -> String
constructedMoleculeCollection
    { payload:
        (
            { constructedMoleculeCollection: collection
            }
        )
    }
    = collection

positionMatrixCollection :: Action -> String
positionMatrixCollection
    { payload: ({ positionMatrixCollection: collection }) }
    = collection

buildingBlockPositionMatrixCollection :: Action -> String
buildingBlockPositionMatrixCollection
    { payload:
        (
            { buildingBlockPositionMatrixCollection: collection }
        )
    }
    = collection

numEntriesPerPage :: Action -> Int
numEntriesPerPage
    { payload: ({ numEntriesPerPage: numEntries }) }
    = numEntries

searchKind :: Action -> SearchKind
searchKind
    { payload: ({ searchKind: searchKind' }) }
    = searchKind'
