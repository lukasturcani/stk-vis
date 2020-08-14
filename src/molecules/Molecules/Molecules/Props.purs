module Molecules.Molecules.Internal.Props
    ( MoleculeTableProps
    , moleculeTableProps
    , TwoDViewerProps
    , twoDViewerProps
    , ThreeDViewerProps
    , threeDViewerProps
    , DispatchAction
    , ActionCreators
    ) where

import Prelude
import Data.Map (Map)
import Data.Tuple (fst, snd)
import Molecules.Molecule as Molecule
import Molecules.Molecules.Internal.Molecules (Molecules (..))
import Molecules.Molecule (properties, smiles, meshes)
import MolDraw.DrawMol.Mesh (MeshOptions, Mesh)
import Molecules.SelectMolecule (SelectMolecule, selectMolecule)
import Effect.Uncurried (EffectFn1, runEffectFn1)
import Effect.Unsafe (unsafePerformEffect)

import SelectingCollection
    ( selected
    , all
    )

type DispatchAction a = EffectFn1 a Unit

data MoleculeTableProps a = MoleculeTableProps
    { columns :: Array String
    , selectedRow :: Int
    , rows :: Array (Map String String)
    , molecules :: Array Molecule.Molecule
    , selectMolecule
        :: DispatchAction a
        -> Int
        -> Molecule.Molecule
        -> Unit
    }

type ActionCreators a r =
    { selectMolecule :: SelectMolecule -> a
    | r
    }

moleculeTableProps
    :: forall a r
    .  ActionCreators a r -> Molecules -> MoleculeTableProps a

moleculeTableProps
    actionCreators
    (Molecules { _columns, _molecules })
    = MoleculeTableProps
        { columns: _columns
        , selectedRow: fst (selected _molecules)
        , rows: map properties molecules
        , molecules: molecules
        , selectMolecule: selectMolecule'
        }
  where
    molecules = all _molecules
    selectMolecule' dispatch id molecule =
        unsafePerformEffect
            (runEffectFn1 dispatch
                (actionCreators.selectMolecule
                    (selectMolecule id molecule)
                )
            )

data TwoDViewerProps = TwoDViewerProps
    { smiles :: String
    }

twoDViewerProps :: Molecules -> TwoDViewerProps
twoDViewerProps (Molecules { _molecules }) = TwoDViewerProps
    { smiles: smiles $ snd $ selected _molecules
    }

data ThreeDViewerProps = ThreeDViewerProps
    { meshes :: Array Mesh
    }


foreign import meshOptions :: MeshOptions

threeDViewerProps :: Molecules -> ThreeDViewerProps
threeDViewerProps (Molecules { _molecules }) = ThreeDViewerProps
    { meshes: meshes $ snd $ selected _molecules
    }
