import * as React from 'react';
import { connect } from 'react-redux';
import {
    DatabaseBrowserKind,
    IInitialDatabaseBrowser,
} from '../../../models';
import {
    MoleculeRequestButtonComponent
} from '../MoleculeRequestButton';
import { MongoDbFieldsComponent } from '../MongoDbFields';
import Container from '@material-ui/core/Container';


interface IInitialDatabaseBrowserProps
{
    kind: DatabaseBrowserKind.Initial;
}


function InitialDatabaseBrowser(props: IInitialDatabaseBrowserProps)
{
    return <Container><MongoDbFieldsComponent /></Container>;
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
