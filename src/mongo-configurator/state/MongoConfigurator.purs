module MongoConfigurator.State
( MongoConfigurator (..)
, SearchKind (..)
, RequestState (..)
) where


data MongoConfigurator = MongoConfigurator
    { _url                                   :: String
    , _database                              :: String
    , _moleculeKey                           :: String
    , _moleculeCollection                    :: String
    , _constructedMoleculeCollection         :: String
    , _positionMatrixCollection              :: String
    , _buildingBlockPositionMatrixCollection :: String
    , _valueCollections                      :: String
    , _numEntriesPerPage                     :: Number
    , _searchKind                            :: SearchKind
    , _requestState                          :: RequestState
    }


data SearchKind
    = UnsortedAll
    | UnsortedBuildingBlocks
    | UnsortedConstructedMolecules


data RequestState
    = Unsent
    | Sent
    | Success
    | Failure
