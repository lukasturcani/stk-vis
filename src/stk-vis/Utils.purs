module StkVis.Utils.UnsortedAll
    ( updateMoleculePage
    ) where

import Requests.UnsortedAll (Result)
import Data.Array ((:))
import StkVis.Action as Action
import RequestManager

type MoleculeKeyName = String

updateMoleculePage
    :: (Action -> Effect Unit)
    -> MoleculeKeyName
    -> Result
    -> Effect Unit

updateMoleculePage
    dispatch
    moleculeKey
    (Result
        { valueCollections
        , molecules
        , pageKind
        }
    )
    = do
        let
            action = Action.updateMoleculePage
                { molecules: map _toMolecule molecules
                , columns: moleculeKey : valueCollections
                }

        dispatch action

