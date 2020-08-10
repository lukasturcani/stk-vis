module RequestManager.Payload
    ( Payload (..)
    , initializeUnsortedAll
    , initializeUnsortedBuildingBlocks
    , initializeUnsortedConstructedMolecules
    , setUnsorted
    , setSorted
    , updateMoleculePage
    ) where

import RequestManager.InitializeUnsortedAll
    ( InitializeUnsortedAll
    )

import RequestManager.InitializeUnsortedBuildingBlocks
    ( InitializeUnsortedBuildingBlocks
    )

import RequestManager.InitializeUnsortedConstructedMolecules
    ( InitializeUnsortedConstructedMolecules
    )

import RequestManager.UpdateMoleculePage
    ( UpdateMoleculePage
    )

import RequestManager.SetUnsorted (SetUnsorted)
import RequestManager.SetSorted (SetSorted)

data Payload
    = InitializeUnsortedAll InitializeUnsortedAll
    | InitializeUnsortedBuildingBlocks InitializeUnsortedBuildingBlocks
    | InitializeUnsortedConstructedMolecules
        InitializeUnsortedConstructedMolecules
    | SetUnsorted SetUnsorted
    | SetSorted SetSorted
    | UpdateMoleculePage UpdateMoleculePage

initializeUnsortedAll :: InitializeUnsortedAll -> Payload
initializeUnsortedAll = InitializeUnsortedAll

initializeUnsortedBuildingBlocks
    :: InitializeUnsortedBuildingBlocks -> Payload

initializeUnsortedBuildingBlocks = InitializeUnsortedBuildingBlocks

initializeUnsortedConstructedMolecules
    :: InitializeUnsortedConstructedMolecules -> Payload

initializeUnsortedConstructedMolecules
    = InitializeUnsortedConstructedMolecules

setUnsorted :: SetUnsorted -> Payload
setUnsorted = SetUnsorted

setSorted :: SetSorted -> Payload
setSorted = SetSorted

updateMoleculePage :: UpdateMoleculePage -> Payload
updateMoleculePage = UpdateMoleculePage
