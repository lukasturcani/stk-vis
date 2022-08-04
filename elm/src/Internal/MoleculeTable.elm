module Internal.MoleculeTable exposing
    ( Style
    , view
    , view2
    )

import Element
import Internal.Molecule as Molecule
import Internal.Picker as Picker
import Widget
import Widget.Material as Material


type alias Style msg =
    { elementTable : List (Element.Attribute msg)
    }


view :
    Style msg
    -> Picker.Picker Molecule.Molecule
    -> Element.Element msg
view style _ =
    let
        data =
            [ { item1 = "a", item2 = "b" }
            , { item1 = "c", item2 = "d" }
            ]

        columns =
            [ { header = Element.text "one"
              , width = Element.fill
              , view = .item1 >> Element.text
              }
            , { header = Element.text "two"
              , width = Element.fill
              , view = .item2 >> Element.text
              }
            ]
    in
    Element.table
        style.elementTable
        { data = data
        , columns = columns
        }


view2 :
    (String -> msg)
    -> Picker.Picker Molecule.Molecule
    -> Element.Element msg
view2 onChange _ =
    let
        data =
            [ { item1 = "a", item2 = "b" }
            , { item1 = "c", item2 = "d" }
            ]

        columns =
            [ Widget.stringColumn
                { title = "one"
                , value = .item1
                , toString = identity
                , width = Element.fill
                }
            , Widget.stringColumn
                { title = "two"
                , value = .item2
                , toString = identity
                , width = Element.fill
                }
            ]
    in
    Widget.sortTable
        (Material.sortTable Material.darkPalette)
        { content = data
        , columns = columns
        , sortBy = "a"
        , asc = True
        , onChange = onChange
        }
