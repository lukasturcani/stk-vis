import {
    IDatabaseBrowser,
    DatabaseBrowserKind,
    InitialRequestStateKind,
    MoleculeRequestStateKind,
} from '../../../../models';
import {
    getInitialRequestState,
    getMoleculeRequestState,
} from '../../../../selectors';


function assertNever(arg: never): never { throw Error(); }


export function isRequestSent(
    browser: IDatabaseBrowser,
)
    : boolean
{
    switch (browser.kind)
    {
        case DatabaseBrowserKind.Initial:
            return (
                getInitialRequestState(browser).kind
                ===
                InitialRequestStateKind.RequestSent
            );

        case DatabaseBrowserKind.Loaded:
            return (
                getMoleculeRequestState(browser).kind
                ===
                MoleculeRequestStateKind.RequestSent
            );

        default:
            assertNever(browser);
    }
}
