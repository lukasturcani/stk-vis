module StkVis.Action
    ( Action
    , updateFields
    , updateMoleculePage
    ) where

import MongoConfigurator.UpdateFields.MongoData (MongoData)
import MoleculeBrowser.UpdateMoleculePage.PageData (PageData)

import StkVis.Payload
    ( Payload
    , updateFields
    , updateMoleculePage
    ) as Payload

type Action =
    { type    :: String
    , payload :: Payload.Payload
    }

updateFields :: MongoData -> Action
updateFields data' =
    { type: "UPDATE_FIELDS"
    , payload: Payload.updateFields data'
    }

updateMoleculePage :: PageData -> Action
updateMoleculePage data' =
    { type: "UPDATE_MOLECULE_PAGE"
    , payload: Payload.updateMoleculePage data'
    }
