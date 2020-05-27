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


interface IInitialDatabaseBrowserProps
{
    kind: DatabaseBrowserKind.Initial;
    url: string;
    database: string;
    moleculeCollection: string;
    positionMatrixCollection: string;
}


function InitialDatabaseBrowser(props: IInitialDatabaseBrowserProps)
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
            <MoleculeRequestButtonComponent isForward={ true } />
        </div>
    );
}


function mapStateToProps(
    state: IInitialDatabaseBrowser
)
    : IInitialDatabaseBrowserProps
{
    return {
        kind:
            DatabaseBrowserKind.Initial,

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


export const InitialDatabaseBrowserComponent
    = connect(mapStateToProps)(InitialDatabaseBrowser)
