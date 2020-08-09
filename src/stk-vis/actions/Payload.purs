module StkVis.Payload
    ( Payload (..)
    , updateMoleculePage
    , initializeUnsortedBuildingBlocks
    , initializeUnsortedConstructedMolecules
    ) where

import Prelude
import StkVis.UpdateMoleculePage (UpdateMoleculePage)

import StkVis.UpdateFields
    ( UpdateFields
    , updateFields
    ) as UpdateFields

import StkVis.UpdateMoleculePage
    ( UpdateMoleculePage
    ) as UpdateMoleculePage


data Payload
    | UpdateMoleculePage UpdateMoleculePage.UpdateMoleculePage
    | InitializeUnsortedAll InitializeUnsortedAll
    | InitializeUnsortedBuildingBlocks InitializeUnsortedBuildingBlocks
    | InitializeUnsortedConstructedMolecules
        InitializeUnsortedConstructedMolecules

updateMoleculePage :: UpdateMoleculePage -> Payload
updateMoleculePage = UpdateMoleculePage

initializeUnsortedAll :: InitializeUnsortedAll -> Payload
initializeUnsortedAll = InitializeUnsortedAll

initializeUnsortedBuildingBlocks
    :: InitializeUnsortedBuildingBlocks
    -> Payload

initializeUnsortedBuildingBlocks = InitializeUnsortedBuildingBlocks

initializeUnsortedConstructedMolecules
    :: InitializeUnsortedConstructedMolecules
    -> Payload

initializeUnsortedConstructedMolecules
    = InitializeUnsortedConstructedMolecules
