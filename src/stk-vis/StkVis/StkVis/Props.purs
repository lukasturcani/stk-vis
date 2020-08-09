module StkVis.StkVis.Internal.Props
    ( Props (..)
    , ActionCreators
    , props
    ) where

import StkVis.StkVis.Internal.StkVis (StkVis (..)) as StkVis
import MongoConfigurator.MongoConfigurator as MongoConfigurator
import MoleculeBrowser.MoleculeBrowser as MoleculeBrowser
import RequestManager.UpdateMoleculePage (UpdateMoleculePage)
import RequestManager.SetSorted (SetSorted)
import RequestManager.SetUnsorted (SetUnsorted)
import Molecules.SelectMolecule (SelectMolecule)

import MongoConfigurator.InitializeMoleculeBrowser.UnsortedAll
    ( InitializeUnsortedAll
    )

import MongoConfigurator.InitializeMoleculeBrowser.UnsortedBuildingBlocks
    ( InitializeUnsortedBuildingBlocks
    )

import MongoConfigurator.InitializeMoleculeBrowser.UnsortedConstructedMolecules
    ( InitializeUnsortedConstructedMolecules
    )

data Props a
    = MongoConfigurator String (MongoConfigurator.Props a)
    | MoleculeBrowser String (MoleculeBrowser.Props a)

type ActionCreators a r =
    { updateMoleculePage :: UpdateMoleculePage -> a
    , setSorted :: SetSorted -> a
    , setUnsorted :: SetUnsorted -> a
    , selectMolecule :: SelectMolecule -> a
    , initializeUnsortedAll :: InitializeUnsortedAll -> a
    , initializeUnsortedBuildingBlocks
        :: InitializeUnsortedBuildingBlocks -> a
    , initializeUnsortedConstructedMolecules
        :: InitializeUnsortedConstructedMolecules -> a
    | r
    }

props
    :: forall a r
    .  ActionCreators a r
    -> StkVis.StkVis
    -> Props a

props actionCreators (StkVis.MongoConfigurator configurator)
    = MongoConfigurator
        "Mongo Configurator"
        (MongoConfigurator.props actionCreators configurator)

props actionCreators (StkVis.MoleculeBrowser browser)
    = MoleculeBrowser
        "Molecule Browser"
        (MoleculeBrowser.props actionCreators browser)
