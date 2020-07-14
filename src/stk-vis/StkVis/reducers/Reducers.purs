module StkVis.StkVis.Reducers
    ( updateFields
    ) where

import StkVis.StkVis.Internal (StkVis)
import StkVis.UpdateFields (Action) as UpdateFields
import StkVis.StkVis.Reducers.Internal.UpdateFields
    (updateFields) as UpdateFields

updateFields :: StkVis -> UpdateFields.Action -> StkVis
updateFields = UpdateFields.updateFields
