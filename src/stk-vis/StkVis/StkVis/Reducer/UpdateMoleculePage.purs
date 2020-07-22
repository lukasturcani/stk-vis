module StkVis.StkVis.Internal.Reducer.Internal.UpdateMoleculePage
    ( updateMoleculePage
    ) where

import StkVis.StkVis.Internal.StkVis (StkVis)
import StkVis.UpdateMoleculePage (UpdateMoleculePage)

updateMoleculePage :: StkVis -> UpdateMoleculePage -> StkVis
updateMoleculePage stkVis payload = stkVis
