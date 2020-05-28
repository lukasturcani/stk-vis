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
        <Container><Grid container
            style={{height: '100%'}}
            spacing={3}
        >
            <Grid item xs={12}
                style={{height: '7%'}}
            >
                <MongoDbFieldsComponent />
            </Grid>
            <Grid
                item xs={12}
                style={ {height: '90%', overflow: 'auto'} }
            >
                <MoleculeTableComponent />
            </Grid>
            <Grid item xs={12}
                style={{height: '3%'}}
            ><Grid container
                spacing={ 3 }
                justify={ 'flex-end' }
            >
            {
                !(
                    props.pageKind === PageKind.First
                    ||
                    props.pageKind === PageKind.Only
                )
                &&
                <Grid item><MoleculeRequestButtonComponent
                    isForward={ false }
                /></Grid>
            }
            <Grid item>
                <MoleculeRequestButtonComponent isForward={ true } />
            </Grid>
            </Grid></Grid>
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
