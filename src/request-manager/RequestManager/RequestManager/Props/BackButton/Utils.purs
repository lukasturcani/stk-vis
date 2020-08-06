module RequestManager.RequestManager.Internal.Props.Internal.BackButton.Internal.Utils
    ( disabled
    )

import RequestManager.PageKind (PageKind)

disabled :: PageKind -> Boolean
disabled First          = true
disabled OnlyComplete   = true
disabled OnlyIncomplete = true
disabled _              = false
