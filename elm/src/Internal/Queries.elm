module Internal.Queries exposing (unsortedAll)

import Internal.MoleculeKey as MoleculeKey
import Json.Encode as E


type alias UnsortedAllParams r =
    { r
        | moleculeKey : MoleculeKey.MoleculeKey
        , constructedMoleculeCollection : String
        , buildingBlockPositionMatrixCollection : String
        , positionMatrixCollection : String
    }


unsortedAll : UnsortedAllParams r -> E.Value
unsortedAll params =
    E.list
        identity
        [ hasMoleculeKey params.moleculeKey
        , getConstructedMolecule
            params.constructedMoleculeCollection
            params.moleculeKey
        , getPositionMatrix
            params.positionMatrixCollection
            params.moleculeKey
            "positionMatrix1"
        , getPositionMatrix
            params.buildingBlockPositionMatrixCollection
            params.moleculeKey
            "positionMatrix2"
        , hasPositionMatrix
        ]


hasMoleculeKey : MoleculeKey.MoleculeKey -> E.Value
hasMoleculeKey moleculeKey =
    E.object
        [ ( "$match"
          , E.object [ ( MoleculeKey.toString moleculeKey, exists True ) ]
          )
        ]


getConstructedMolecule : String -> MoleculeKey.MoleculeKey -> E.Value
getConstructedMolecule collection moleculeKey =
    lookup
        collection
        (MoleculeKey.toString moleculeKey)
        (MoleculeKey.toString moleculeKey)
        "constructedMolecule"


getPositionMatrix : String -> MoleculeKey.MoleculeKey -> String -> E.Value
getPositionMatrix collection moleculeKey destination =
    lookup
        collection
        (MoleculeKey.toString moleculeKey)
        (MoleculeKey.toString moleculeKey)
        destination


hasPositionMatrix : E.Value
hasPositionMatrix =
    match
        (expr
            (or
                [ gt (size (E.string "$positionMatrix1")) (E.int 0)
                , gt (size (E.string "$positionMatrix2")) (E.int 0)
                ]
            )
        )


exists : Bool -> E.Value
exists e =
    E.object [ ( "$exists", E.bool e ) ]


lookup : String -> String -> String -> String -> E.Value
lookup from localField foreignField as_ =
    E.object
        [ ( "$lookup"
          , E.object
                [ ( "from", E.string from )
                , ( "localField", E.string localField )
                , ( "foreignField", E.string foreignField )
                , ( "as", E.string as_ )
                ]
          )
        ]


match : E.Value -> E.Value
match m =
    E.object [ ( "$match", m ) ]


expr : E.Value -> E.Value
expr e =
    E.object [ ( "$expr", e ) ]


or : List E.Value -> E.Value
or o =
    E.object [ ( "$or", E.list identity o ) ]


gt : E.Value -> E.Value -> E.Value
gt first second =
    E.object [ ( "$gt", E.list identity [ first, second ] ) ]


size : E.Value -> E.Value
size s =
    E.object [ ( "$size", s ) ]
