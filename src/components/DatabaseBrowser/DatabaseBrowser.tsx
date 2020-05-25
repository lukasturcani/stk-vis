import * as React from 'react';
import { connect } from 'react-redux';
import { MoleculeTableComponent } from './MoleculeTable';
import {
    MoleculeRequestButtonComponent
} from './MoleculeRequestButton';
import {
    IDatabaseBrowser,
    DatabaseBrowserKind,
    IState,
    PageKind,
} from '../../models';
import { getDatabaseBrowserKind } from '../../selectors';


interface IDatabaseBrowserProps
{
    kind: DatabaseBrowserKind;
    pageKind?: PageKind;
}


function assertNever(arg: never): never { throw Error(); }


function InitialDatabaseBrowserComponent()
{
    return (
        <div>
            <MoleculeRequestButtonComponent isForward={ true } />
        </div>
    );
}


function LoadedDatabaseBrowserComponent({
    firstPage ,
}: {
    firstPage: boolean,
})
{
    return (
        <div>
            <MoleculeTableComponent />
            {
                !firstPage
                &&
                <MoleculeRequestButtonComponent isForward={ false } />
            }
            <MoleculeRequestButtonComponent isForward={ true } />
        </div>
    );
}


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
            assertNever(props.kind);
    }
}


function mapStateToProps(
    state: IDatabaseBrowser,
)
    : IDatabaseBrowserProps
{
    let props: IDatabaseBrowserProps
        = {
            kind: getDatabaseBrowserKind(state),
        };
    if ('pageKind' in state)
    {
        props['pageKind'] = state.pageKind;
    }
    return props;
}


export const DatabaseBrowserComponent
    = connect(mapStateToProps)(DatabaseBrowser);
