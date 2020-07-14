module StkVis.Reducers
    ( updateFields
    ) where

import StkVis.Internal.Data (StkVis)
import StkVis.UpdateFields (Action) as UpdateFields
import StkVis.Reducers.Internal.UpdateFields
    (updateFields) as UpdateFields

updateFields :: StkVis -> UpdateFields.Action -> StkVis
updateFields = UpdateFields.updateFields
