import * as React from 'react';
import { connect } from 'react-redux';
import {
    DatabaseBrowserKind,
    IState,
} from '../../../models';
import {
    getDatabaseBrowserKind,
} from '../../../selectors';
import {
    InitialDatabaseBrowserComponent,
} from './InitialDatabaseBrowser';
import {
    LoadedDatabaseBrowserComponent,
} from './LoadedDatabaseBrowser';
import  { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';
import CssBaseline from '@material-ui/core/CssBaseline';


interface IDatabaseBrowserProps
{
    kind: DatabaseBrowserKind;
}


function assertNever(arg: never): never { throw Error(); }


function DatabaseBrowser(props: IDatabaseBrowserProps)
{
    switch (props.kind)
    {
        case DatabaseBrowserKind.Initial:
            return <InitialDatabaseBrowserComponent />;

        case DatabaseBrowserKind.Loaded:
            return <LoadedDatabaseBrowserComponent />;

        default:
            assertNever(props.kind);
    }
}


function ThemedDatabaseBrowser(props: IDatabaseBrowserProps)
{
    return (
        <ThemeProvider theme={theme} >
            <CssBaseline />
            { DatabaseBrowser(props) }
        </ThemeProvider>
    )
}

function mapStateToProps(
    state: IState,
)
    : IDatabaseBrowserProps
{
    return {
        kind: getDatabaseBrowserKind(state),
    }
}


export const DatabaseBrowserComponent
    = connect(mapStateToProps)(ThemedDatabaseBrowser as any);
