module StkVis.StkVis.Internal.Reducer
    ( reducer
    ) where

import StkVis.StkVis.Internal.StkVis (StkVis)
import StkVis.Action (Action)
import StkVis.Payload (Payload (..))

import StkVis.StkVis.Internal.Reducer.Internal.UpdateMoleculePage
    ( updateMoleculePage
    )
import StkVis.StkVis.Internal.Reducer.Internal.SetSorted
    ( setSorted
    )
import StkVis.StkVis.Internal.Reducer.Internal.SetUnsorted
    ( setUnsorted
    )
import StkVis.StkVis.Internal.Reducer.Internal.SelectMolecule
    ( selectMolecule
    )
import StkVis.StkVis.Internal.Reducer.Internal.InitializeUnsortedAll
    ( initializeUnsortedAll
    )
import StkVis.StkVis.Internal.Reducer.Internal.InitializeUnsortedBuildingBlocks
    ( initializeUnsortedBuildingBlocks
    )
import StkVis.StkVis.Internal.Reducer.Internal.InitializeUnsortedConstructedMolecules
    ( initializeUnsortedConstructedMolecules
    )

import StkVis.StkVis.Internal.Reducer.Internal.InitializeMongoConfigurator
    ( initializeMongoConfigurator
    )

reducer :: StkVis -> Action -> StkVis

reducer
    stkVis
    ({ payload: (UpdateMoleculePage payload) })
    = updateMoleculePage stkVis payload

reducer
    stkVis
    ({ payload: (SetSorted payload) })
    = setSorted stkVis payload

reducer
    stkVis
    ({ payload: (SetUnsorted payload) })
    = setUnsorted stkVis payload

reducer
    stkVis
    ({ payload: (SelectMolecule payload) })
    = selectMolecule stkVis payload

reducer
    stkVis
    ({ payload: (InitializeUnsortedAll payload) })
    = initializeUnsortedAll stkVis payload

reducer
    stkVis
    ({ payload: (InitializeUnsortedBuildingBlocks payload) })
    = initializeUnsortedBuildingBlocks stkVis payload

reducer
    stkVis
    ({ payload: (InitializeUnsortedConstructedMolecules payload) })
    = initializeUnsortedConstructedMolecules stkVis payload

reducer
    stkVis
    ({ payload: (InitializeMongoConfigurator payload) })
    = initializeMongoConfigurator stkVis payload
