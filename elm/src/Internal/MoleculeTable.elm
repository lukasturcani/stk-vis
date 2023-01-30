module Internal.MoleculeTable exposing (view)

import Dict exposing (Dict)
import Element exposing (Attribute, Element)
import Element.Border as Border
import Element.Events as Events
import Internal.Molecule as Molecule exposing (Molecule)
import Internal.Picker as Picker exposing (Picker)


type alias ToMsg msg =
    { clickedRow : Int -> msg
    }


view : ToMsg msg -> List String -> Picker Molecule -> Element msg
view toMsg columnNames molecules =
    let
        data =
            molecules
                |> Picker.toList
                |> List.map Molecule.properties

        columns =
            columnNames
                |> List.map
                    (\name ->
                        { header = Element.text name
                        , width = Element.fill
                        , view = viewRow toMsg.clickedRow (Picker.picked molecules |> Tuple.first) name
                        }
                    )
    in
    Element.indexedTable
        tableStyle
        { data = data
        , columns = columns
        }


viewRow : (Int -> msg) -> Int -> String -> Int -> Dict String String -> Element msg
viewRow toMsg selectedRowIndex column index data =
    data
        |> getWithDefault "" column
        |> Element.text
        |> Element.el (rowStyle (toMsg index) selectedRowIndex index)


getWithDefault : String -> String -> Dict String String -> String
getWithDefault default key dict =
    case Dict.get key dict of
        Just value ->
            value

        Nothing ->
            default


tableStyle : List (Attribute msg)
tableStyle =
    [ Element.width Element.fill
    , Element.height Element.fill
    ]


rowStyle : msg -> Int -> Int -> List (Attribute msg)
rowStyle clickedRow selectedRowIndex index =
    if selectedRowIndex == index then
        [ Events.onClick clickedRow
        , Border.color (Element.rgb255 106 13 173)
        , Border.width 5
        ]

    else
        [ Events.onClick clickedRow
        ]
