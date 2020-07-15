module MongoConfigurator.UpdateFields
    ( module Exports
    , createAction
    ) where

import MongoConfigurator.UpdateFields.Internal.Action
    ( Action
    , url
    , database
    , moleculeKey
    , moleculeCollection
    , constructedMoleculeCollection
    , positionMatrixCollection
    , buildingBlockPositionMatrixCollection
    , numEntriesPerPage
    , searchKind
    ) as Exports

import MongoConfigurator.UpdateFields.Internal.CreateAction
    ( createAction
    ) as CreateAction

import MongoConfigurator.UpdateFields.Internal.MongoData
    ( MongoData
    , SearchKind (..)
    ) as Exports


createAction :: Exports.MongoData -> Exports.Action
createAction = CreateAction.createAction

unsortedAll :: Exports.SearchKind
unsortedAll = Exports.UnsortedAll

unsortedBuildingBlocks :: Exports.SearchKind
unsortedBuildingBlocks = Exports.UnsortedBuildingBlocks

unsortedConstructedMolecules :: Exports.SearchKind
unsortedConstructedMolecules = Exports.UnsortedConstructedMolecules
