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
--import Effect.Promise (class Deferred, Promise, catch)
--import Requests.BuildingBlocks as Request

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
--    , buildingBlockRequests
--        :: Deferred
--        => Array (DispatchAction a -> Promise Unit)

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
--        , buildingBlockRequests
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

 --   buildingBlockRequests dispatch =
 --       all (map (buildingBlockRequest dispatch) _molecules)

 --   buildingBlockRequest
 --       :: Deferred =>
 --       -> DispatchAction a
 --       -> Molecule.Molecule
 --       -> Promise Unit

 --   buildingBlockRequest dispatch molecule = do
 --       result <- Request.request
 --           { url
 --           , database
 --           , moleculeKey
 --           , moleculeCollection
 --           , constructedMoleculeCollection
 --           , positionMatrixCollection
 --           , buildingBlockPositionMatrixCollection
 --           , valueCollections
 --           , molecule
 --           }

 --       let
 --           (Request.Result { molecules }) = result

 --           payload = updateMoleculePage
 --               { columns:
 --                   Array.concat [[moleculeKey], valueCollections]
 --               , moleculeKey
 --               , molecules
 --               , pageIndex
 --               , pageKind: fromRequest pageKind'
 --               , valueCollections
 --               }

 --       pure (unsafePerformEffect
 --           (runEffectFn1 dispatch (createAction payload))
 --       )

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
