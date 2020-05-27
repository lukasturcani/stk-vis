import * as React from 'react';
import { connect } from 'react-redux';
import {
    IDatabaseBrowser,
    DatabaseBrowserKind,
    IInitialDatabaseBrowser,
    PageKind,
} from '../../../models';
import {
    MoleculeRequestButtonComponent
} from '../MoleculeRequestButton';
import TextField from '@material-ui/core/TextField';
import { MongoDbFieldsComponent } from '../MongoDbFields';


interface IInitialDatabaseBrowserProps
{
    kind: DatabaseBrowserKind.Initial;
}


function InitialDatabaseBrowser(props: IInitialDatabaseBrowserProps)
{
    return <MongoDbFieldsComponent />;
}


function mapStateToProps(
    state: IInitialDatabaseBrowser
)
    : IInitialDatabaseBrowserProps
{
    return {
        kind:
            DatabaseBrowserKind.Initial,
    };
}


export const InitialDatabaseBrowserComponent
    = connect(mapStateToProps)(InitialDatabaseBrowser)
