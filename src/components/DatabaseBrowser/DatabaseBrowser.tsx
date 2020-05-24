import * as React from 'react';
import { connect } from 'react-redux';
import { MoleculeTableComponent } from './MoleculeTable';
import { NextButtonComponent } from './NextButton';
import { IDatabaseBrowser, DatabaseBrowserKind } from '../../models';
import { getDatabaseBrowserKind } from '../../selectors';


interface IDatabaseBrowserProps
{
    kind: DatabaseBrowserKind;
}


function assertNever(arg: never): never { throw Error(); }


function InitialDatabaseBrowserComponent()
{
    return <div><NextButtonComponent /></div>;
}


function LoadedDatabaseBrowserComponent()
{
    return (
        <div>
            <MoleculeTableComponent />
            <NextButtonComponent />
        </div>
    );
}


function DatabaseBrowser({
    kind,
}:{
    kind: DatabaseBrowserKind;
})
{
    switch (kind)
    {
        case DatabaseBrowserKind.Initial:
            return <InitialDatabaseBrowserComponent />;

        case DatabaseBrowserKind.Loaded:
            return <LoadedDatabaseBrowserComponent />;

        default:
            assertNever(kind);
    }
}


function mapStateToProps(
    state: IDatabaseBrowser,
)
    : IDatabaseBrowserProps
{
    return { kind: getDatabaseBrowserKind(state) };
}


export const DatabaseBrowserComponent
    = connect(mapStateToProps)(DatabaseBrowser);
