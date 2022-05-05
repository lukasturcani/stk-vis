module Page.ThreeDViewer
    ( Props
    ) where

import MolDraw.DrawMol.Mesh (Mesh)

type Props =
    { meshes :: Array Mesh
    }
