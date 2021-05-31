module Requests.Molecule.Internal.Data
    ( Molecule (..)
    , Properties
    , key
    , properties
    , constructed
    , toValidated
    , fromValidated
    , fromMoleculeEntry
    ) where

import Prelude
import Data.Tuple (Tuple)
import Data.List (List)
import Data.Map (Map)
import Data.Map as Map
import Data.Maybe (Maybe)
import ValidatedMolecule as Validated
import Requests.MoleculeKey (MoleculeKeyValue)
import Requests.MoleculeEntry (MoleculeEntry)
import Requests.MoleculeEntry as MoleculeEntry
import Foreign.Object as Object
import Debug.Trace (traceM)

type Properties = Map String String

data Molecule = Molecule
    { _key         :: MoleculeKeyValue
    , _properties  :: Properties
    , _molecule    :: Validated.Molecule
    , _constructed :: Boolean
    }

key :: Molecule -> MoleculeKeyValue
key (Molecule { _key }) = _key

properties :: Molecule -> Map String String
properties (Molecule { _properties }) = _properties

constructed :: Molecule -> Boolean
constructed (Molecule { _constructed }) = _constructed

toValidated :: Molecule -> Validated.Molecule
toValidated (Molecule { _molecule }) = _molecule

fromValidated
    :: Boolean
    -> MoleculeKeyValue
    -> Properties
    -> Validated.Molecule
    -> Molecule

fromValidated constructed' key' props mol = Molecule
    { _key: key'
    , _properties: props
    , _molecule: mol
    , _constructed: constructed'
    }


fromMoleculeEntry :: MoleculeEntry -> Maybe Molecule
fromMoleculeEntry moleculeEntry = do
    _ <- traceM moleculeEntry
    _molecule <- MoleculeEntry.toMolecule moleculeEntry
    pure
        (Molecule
            { _key: moleculeEntry.key
            , _properties: Map.fromFoldable items
            , _molecule
            , _constructed: moleculeEntry.constructed
            }
        )

  where

    items :: List (Tuple String String)
    items = Object.toUnfoldable moleculeEntry.properties
