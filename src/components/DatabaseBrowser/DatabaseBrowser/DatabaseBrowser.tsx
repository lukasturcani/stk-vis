import * as React from 'react';
import { connect } from 'react-redux';
import { MoleculeTableComponent } from '../MoleculeTable';
import {
    IDatabaseBrowser,
    DatabaseBrowserKind,
    IState,
    PageKind,
} from '../../../models';
import {
    getDatabaseBrowserKind,
    getPageKind,
    getDatabaseBrowser,
} from '../../../selectors';
import {
    IInitialDatabaseBrowserProps,
    InitialDatabaseBrowserComponent,
} from './InitialDatabaseBrowser';
import {
    ILoadedDatabaseBrowserProps,
    LoadedDatabaseBrowserComponent,
} from './LoadedDatabaseBrowser';
import  { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';


type IDatabaseBrowserProps =
    | IInitialDatabaseBrowserProps
    | ILoadedDatabaseBrowserProps;


function assertNever(arg: never): never { throw Error(); }


function DatabaseBrowser(props: IDatabaseBrowserProps)
{
    switch (props.kind)
    {
        case DatabaseBrowserKind.Initial:
            return <InitialDatabaseBrowserComponent />;

        case DatabaseBrowserKind.Loaded:

            return <LoadedDatabaseBrowserComponent
                firstPage={
                    props.pageKind === PageKind.First
                    ||
                    props.pageKind === PageKind.Only
                }
            />;

        default:
            assertNever(props);
    }
}


function ThemedDatabaseBrowser(props: IDatabaseBrowserProps)
{
    return (
        <ThemeProvider theme={theme} >
            { DatabaseBrowser(props) }
        </ThemeProvider>
    )
}

function mapStateToProps(
    state: IState,
)
    : IDatabaseBrowserProps
{
    const browser: IDatabaseBrowser
        = getDatabaseBrowser(state);

    switch (browser.kind)
    {
        case DatabaseBrowserKind.Initial:
            return {
                kind: DatabaseBrowserKind.Initial,
            };

        case DatabaseBrowserKind.Loaded:
            return {
                kind: DatabaseBrowserKind.Loaded,
                pageKind: getPageKind(browser),
            };

        default:
            assertNever(browser);
    }
}


export const DatabaseBrowserComponent
    = connect(mapStateToProps)(ThemedDatabaseBrowser as any);
