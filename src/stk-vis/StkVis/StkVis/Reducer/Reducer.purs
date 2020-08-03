module StkVis.StkVis.Internal.Reducer
    ( reducer
    ) where

import StkVis.StkVis.Internal.StkVis (StkVis)
import StkVis.Action (Action)
import StkVis.Payload (Payload (..))

import StkVis.StkVis.Internal.Reducer.Internal.UpdateFields
    (updateFields
    )

import StkVis.StkVis.Internal.Reducer.Internal.UpdateMoleculePage
    ( updateMoleculePage
    )

reducer :: StkVis -> Action -> StkVis
reducer
    stkVis
    ({ payload: (UpdateFields payload) })
    = updateFields stkVis payload

reducer
    stkVis
    ({ payload: (UpdateMoleculePage payload) })
    = updateMoleculePage stkVis payload
