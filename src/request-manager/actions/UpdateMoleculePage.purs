module RequestManager.UpdateMoleculePage
    ( UpdateMoleculePage
    , PageData
    , updateMoleculePage
    , pageKind
    , pageIndex
    , molecules
    , columns
    , moleculeKey
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
    , pageIndex: pageIndex'
    , pageKind: pageKind'
    }
    = UpdateMoleculePage
        { _columns: columns
        , _moleculeKey: moleculeKey
        , _molecules: molecules
        , _pageIndex: pageIndex'
        , _pageKind: pageKind'
        }

pageKind :: UpdateMoleculePage -> PageKind
pageKind (UpdateMoleculePage { _pageKind }) = _pageKind

pageIndex :: UpdateMoleculePage -> Int
pageIndex (UpdateMoleculePage { _pageIndex }) = _pageIndex

molecules :: UpdateMoleculePage -> SelectingCollection Molecule
molecules (UpdateMoleculePage { _molecules }) = _molecules

columns :: UpdateMoleculePage -> Array String
columns (UpdateMoleculePage { _columns }) = _columns

moleculeKey :: UpdateMoleculePage -> String
moleculeKey (UpdateMoleculePage { _moleculeKey }) = _moleculeKey
