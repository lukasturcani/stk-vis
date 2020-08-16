module Page.MoleculeBrowser.Breadcrumbs
    ( Props
    ) where

import Prelude
import DispatchAction (DispatchAction)

type Props a =
    { onClick :: DispatchAction a -> Unit
    }
