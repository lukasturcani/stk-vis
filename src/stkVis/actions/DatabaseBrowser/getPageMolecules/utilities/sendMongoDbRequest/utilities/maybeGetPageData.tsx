import { IPageData } from './IPageData';
import {
    Nothing,
    Just,
    Maybe,
} from '../../../../../../utilities';
import {
    IInitialDatabaseBrowser,
    ILoadedDatabaseBrowser,
    DatabaseBrowserKind
} from '../../../../../../models';
import {
    getPageIndex,
    getTableMolecules,
} from '../../../../../../selectors';


export function maybeGetPageData(
    state: IInitialDatabaseBrowser | ILoadedDatabaseBrowser,
)
    : Maybe<IPageData>
{
    switch(state.kind)
    {
        case DatabaseBrowserKind.Initial:
            return new Nothing();

        case DatabaseBrowserKind.Loaded:
            return new Just({
                pageIndex: getPageIndex(state),
                numMolecules: getTableMolecules(state).length,
            });

        default:
            assertNever(state);
    }
}


function assertNever(arg: never): never { throw Error(); }
