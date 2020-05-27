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
    InitialDatabaseBrowserComponent,
} from './InitialDatabaseBrowser';
import {
    LoadedDatabaseBrowserComponent,
} from './LoadedDatabaseBrowser';
import  { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';


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
