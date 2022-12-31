module Internal.MoleculeTable exposing
    ( Style
    , view
    )

import Dict exposing (Dict)
import Element exposing (Attribute, Element)
import Internal.Molecule as Molecule exposing (Molecule)
import Internal.Picker as Picker exposing (Picker)


type alias Style msg =
    { elementTable : List (Element.Attribute msg)
    }


view : List String -> Picker Molecule -> Element msg
view columnNames molecules =
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
                        , view = getWithDefault "" name >> Element.text
                        }
                    )
    in
    Element.table
        elementTableStyle
        { data = data
        , columns = columns
        }


getWithDefault : String -> String -> Dict String String -> String
getWithDefault default key dict =
    case Dict.get key dict of
        Just value ->
            value

        Nothing ->
            default


elementTableStyle : List (Attribute msg)
elementTableStyle =
    [ Element.width Element.fill
    , Element.height Element.fill
    ]
