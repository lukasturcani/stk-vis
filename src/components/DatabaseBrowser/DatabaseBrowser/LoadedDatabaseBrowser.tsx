import * as React from 'react';
import { connect } from 'react-redux';
import {
    getPageKind,
} from '../../../selectors';
import { MoleculeTableComponent } from '../MoleculeTable';
import {
    IDatabaseBrowser,
    DatabaseBrowserKind,
    ILoadedDatabaseBrowser,
    PageKind,
} from '../../../models';
import {
    MoleculeRequestButtonComponent
} from '../MoleculeRequestButton';
import { MongoDbFieldsComponent } from '../MongoDbFields';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';


interface ILoadedDatabaseBrowserProps
{
    kind: DatabaseBrowserKind.Loaded;
    pageKind: PageKind;
}


function LoadedDatabaseBrowser(props: ILoadedDatabaseBrowserProps)
{
    return (
        <Container><Grid container spacing={5}>
            <Grid item xs={12}><MongoDbFieldsComponent /></Grid>
            <Grid item xs={12}><MoleculeTableComponent /></Grid>
            <Grid item xs={12}>
            {
                !(
                    props.pageKind === PageKind.First
                    ||
                    props.pageKind === PageKind.Only
                )
                &&
                <MoleculeRequestButtonComponent
                    isForward={ false }
                />
            }
            <MoleculeRequestButtonComponent isForward={ true } />
            </Grid>
        </Grid></Container>
    );
}


function mapStateToProps(
    state: ILoadedDatabaseBrowser
)
    : ILoadedDatabaseBrowserProps
{
    return {
        kind:
            DatabaseBrowserKind.Loaded,

        pageKind:
            getPageKind(state),

    };
}


export const LoadedDatabaseBrowserComponent
    = connect(mapStateToProps)(LoadedDatabaseBrowser)
