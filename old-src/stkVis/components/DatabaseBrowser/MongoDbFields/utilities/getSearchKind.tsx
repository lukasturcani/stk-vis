import {
    Maybe,
    Just,
    Nothing,
} from 'maybe';
import {
    SearchKind,
    UnsortedSearchKind,
} from '../../../../models';


export function getSearchKind(
    selectBuildingBlocks: boolean,
    selectConstructedMolecules: boolean,
)
    : Maybe<UnsortedSearchKind>
{
    if (selectBuildingBlocks && selectConstructedMolecules)
    {
        return new Just(SearchKind.UnsortedBoth);
    }
    else if (selectBuildingBlocks)
    {
        return new Just(SearchKind.UnsortedBuildingBlocks);
    }
    else if (selectConstructedMolecules)
    {
        return new Just(SearchKind.UnsortedConstructedMolecules);
    }
    else
    {
        return new Nothing();
    }

}
