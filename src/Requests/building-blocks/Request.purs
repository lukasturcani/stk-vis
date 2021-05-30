module Requests.BuildingBlocks.Internal.Request
    ( RequestOptions
    , request
    ) where

import Prelude
import Effect.Promise (class Deferred, Promise, all, reject)
import Data.Array as Array
import Mongo as Mongo
import Data.Maybe (Maybe (Nothing, Just))
import Data.Maybe.Utils as Maybe
import SelectingCollection (SelectingCollection, selectingCollection)
import Requests.MoleculeKey (MoleculeKeyName, MoleculeKeyValue)
import Requests.Collection as Collection
import Requests.Utils as Utils
import Data.Map (keys)
import Effect.Exception (error)

import Requests.Molecule
    ( Molecule
    , fromEntry
    ) as Molecule

import Requests.Molecule.Utils
    ( toMap
    )as Molecule

import Requests.BuildingBlocks.Internal.Result
    ( Result (Result)
    )

import Requests.PositionMatrix
    ( fromEntry
    ) as Matrix

import Requests.PositionMatrix.Utils
    ( toMap
    ) as Matrix

import Requests.UnvalidatedMoleculeQueryEntry
    ( UnvalidatedMoleculeQueryEntry
    )

type RequestOptions =
    { url                                   :: String
    , database                              :: String
    , moleculeKey                           :: String
    , moleculeCollection                    :: String
    , constructedMoleculeCollection         :: String
    , positionMatrixCollection              :: String
    , buildingBlockPositionMatrixCollection :: String
    , valueCollections                      :: Array String
    , molecule                              :: String
    }

type ConstructedMoleculeCollectionName = String

data UnvalidatedConstructedMoleculeQueryEntry

foreign import _moleculeQuery
    :: MoleculeKeyName
    -> MoleculeKeyValue
    -> Mongo.Query

foreign import _buildingBlockQuery
    :: MoleculeKeyName
    -> ConstructedMoleculeCollectionName
    -> Array MoleculeKeyValue
    -> Mongo.AggregationQuery

foreign import _buildingBlockKeys
    :: MoleculeKeyName
    -> UnvalidatedConstructedMoleculeQueryEntry
    -> Array MoleculeKeyValue



request :: Deferred => RequestOptions -> Promise Result
request options = do
    client <-  Mongo.client options.url
    let database = Mongo.database client options.database

    rawMolecule <- Mongo.findOne
        database
        options.constructedMoleculeCollection
        (_moleculeQuery options.moleculeKey options.molecule)

    rawMoleculeEntries <-
        Mongo.toArray $
        Mongo.aggregate
            database
            options.moleculeCollection
            (_buildingBlockQuery
                options.moleculeKey
                options.constructedMoleculeCollection
                (Array.concatMap
                    (_buildingBlockKeys options.moleculeKey)
                    rawMolecule
                )
            )
    let

        maybeMolecule
            :: UnvalidatedMoleculeQueryEntry
            -> Maybe Molecule.Molecule

        maybeMolecule = Molecule.fromEntry options.moleculeKey

        baseMolecules =
            Molecule.toMap $
            Array.concat   $
            map
                (Maybe.toArray <<< maybeMolecule)
                rawMoleculeEntries

        dataQuery =
            Utils.dataQuery options.moleculeKey
            (Array.fromFoldable <<< keys $ baseMolecules)

    matrixEntries1 <-
        Mongo.toArray $ Mongo.find
            database
            options.positionMatrixCollection
            dataQuery

    matrixEntries2 <-
        Mongo.toArray $ Mongo.find
            database
            options.buildingBlockPositionMatrixCollection
            dataQuery

    let
        matrices =
            Matrix.toMap <<< Array.concat <<<
            map (
                Maybe.toArray <<< Matrix.fromEntry options.moleculeKey
            ) $
            (Array.concat [matrixEntries1, matrixEntries2])

        positioned = Utils.addPositionMatrices baseMolecules matrices

    values <-
        all $ map
            (Mongo.toArray <<< Mongo.find' database dataQuery)
            options.valueCollections

    let
        collections =
            Array.zipWith
                (Collection.fromEntries options.moleculeKey)
                options.valueCollections
                values

        molecules = Utils.addValues positioned collections

    collection <- collectionPromise molecules

    pure (Result { molecules: collection })

collectionPromise
    :: Deferred
    => Array Molecule.Molecule
    -> Promise (SelectingCollection Molecule.Molecule)

collectionPromise molecules = case Array.uncons molecules of
    Just { head: x, tail: xs } -> pure $ selectingCollection [] x xs
    Nothing -> reject $ error "No valid molecules were found."
