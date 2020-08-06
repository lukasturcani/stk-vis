module RequestManager.UpdateMoleculePage
    ( UpdateMoleculePage
    , PageData
    , updateMoleculePage
    ) where

import SelectingCollection (SelectingCollection)
import RequestManager.PageKind (PageKind)
import Requests.Molecule (Molecule)

type PageData =
    { columns     :: Array String
    , moleculeKey :: String
    , molecules   :: SelectingCollection Molecule
    , pageIndex   :: Int
    , pageKind    :: PageKind
    }

data UpdateMoleculePage = UpdateMoleculePage
    { _columns     :: Array String
    , _moleculeKey :: String
    , _molecules   :: SelectingCollection Molecule
    , _pageIndex   :: Int
    , _pageKind    :: PageKind
    }

updateMoleculePage :: PageData -> UpdateMoleculePage
updateMoleculePage
    { columns
    , moleculeKey
    , molecules
    , pageIndex
    , pageKind
    }
    = UpdateMoleculePage
        { _columns: columns
        , _moleculeKey: moleculeKey
        , _molecules: molecules
        , _pageIndex: pageIndex
        , _pageKind: pageKind
        }

