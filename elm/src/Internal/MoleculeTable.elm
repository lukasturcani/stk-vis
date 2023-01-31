module Internal.MoleculeTable exposing (view)

import Dict exposing (Dict)
import Element exposing (Attribute, Element)
import Element.Background as Background
import Element.Events as Events
import Json.Decode exposing (Error, Value)


type alias ToMsg msg =
    { clickedRow : Int -> Value -> msg
    }


type alias RowData =
    ( Value, Result Error (Dict String String) )


type alias ViewArgs msg =
    { toMsg : ToMsg msg
    , columnNames : List String
    , rows : List RowData
    , selectedRowIndex : Int
    }


view : ViewArgs msg -> Element msg
view { toMsg, columnNames, rows, selectedRowIndex } =
    let
        tableColumns =
            columnNames
                |> List.map
                    (\name ->
                        { header = Element.text name
                        , width = Element.fill
                        , view =
                            viewRow
                                { toMsg = toMsg.clickedRow
                                , selectedRowIndex = selectedRowIndex
                                , column = name
                                }
                        }
                    )
    in
    Element.indexedTable
        tableStyle
        { data = rows
        , columns = tableColumns
        }


type alias ViewRowArgs msg =
    { toMsg : Int -> Value -> msg
    , selectedRowIndex : Int
    , column : String
    }


viewRow : ViewRowArgs msg -> Int -> RowData -> Element msg
viewRow { toMsg, selectedRowIndex, column } index ( molecule, data ) =
    case data of
        Ok dict ->
            dict
                |> getWithDefault " " column
                |> Element.text
                |> Element.el (rowStyle (toMsg index molecule) selectedRowIndex index)

        Err _ ->
            Element.text "broken"


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
        , Background.color (Element.rgb255 106 13 173)
        ]

    else
        [ Events.onClick clickedRow
        ]
