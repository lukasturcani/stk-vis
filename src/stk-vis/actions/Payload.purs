module StkVis.Payload
    ( Payload (..)
    , updateMoleculePage
    , initializeUnsortedAll
    , initializeUnsortedBuildingBlocks
    , initializeUnsortedConstructedMolecules
    ) where

import StkVis.UpdateMoleculePage (UpdateMoleculePage)

import StkVis.UpdateMoleculePage
    ( UpdateMoleculePage
    ) as UpdateMoleculePage

import StkVis.InitializeMoleculeBrowser.UnsortedAll
    ( InitializeUnsortedAll
    )
import StkVis.InitializeMoleculeBrowser.UnsortedBuildingBlocks
    ( InitializeUnsortedBuildingBlocks
    )
import StkVis.InitializeMoleculeBrowser.UnsortedConstructedMolecules
    ( InitializeUnsortedConstructedMolecules
    )


data Payload
    = UpdateMoleculePage UpdateMoleculePage.UpdateMoleculePage
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
