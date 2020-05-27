import * as React from 'react';
import { connect } from 'react-redux';
import {
    getDatabaseBrowserKind,
    getPageKind,
    getDatabaseBrowser,
    getMongoDbUrl,
    getMongoDbDatabase,
    getMongoDbMoleculeCollection,
    getMongoDbPositionMatrixCollection,
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
import TextField from '@material-ui/core/TextField';


interface ILoadedDatabaseBrowserProps
{
    kind: DatabaseBrowserKind.Loaded;
    pageKind: PageKind;
    url: string;
    database: string;
    moleculeCollection: string;
    positionMatrixCollection: string;

}


function LoadedDatabaseBrowser(props: ILoadedDatabaseBrowserProps)
{
    return (
        <div>
            <TextField
                id='mongo-url'
                label='MongoDB URL'
                defaultValue={ props.url }
                variant='outlined'
            />
            <TextField
                id='mongo-database'
                label='Database Name'
                defaultValue={ props.database }
                variant='outlined'
            />
            <TextField
                id='mongo-molecule-collection'
                label='Molecule Collection Name'
                defaultValue={ props.moleculeCollection }
                variant='outlined'
            />
            <TextField
                id='mongo-position-matrix-collection'
                label='Position Matrix Collection Name'
                defaultValue={ props.positionMatrixCollection }
                variant='outlined'
            />
            <MoleculeTableComponent />
            {
                !(
                    props.pageKind === PageKind.First
                    ||
                    props.pageKind === PageKind.Only
                )
                &&
                <MoleculeRequestButtonComponent isForward={ false } />
            }
            <MoleculeRequestButtonComponent isForward={ true } />
        </div>
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

        url:
            getMongoDbUrl(state),

        database:
            getMongoDbDatabase(state),

        moleculeCollection:
            getMongoDbMoleculeCollection(state),

        positionMatrixCollection:
            getMongoDbPositionMatrixCollection(state),
    };
}


export const LoadedDatabaseBrowserComponent
    = connect(mapStateToProps)(LoadedDatabaseBrowser)
