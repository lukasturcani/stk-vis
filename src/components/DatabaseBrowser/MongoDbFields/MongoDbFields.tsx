import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import * as React from 'react';
import {
    getMongoDbUrl,
    getMongoDbDatabase,
    getMongoDbMoleculeCollection,
    getMongoDbPositionMatrixCollection,
    getNumEntriesPerPage,
} from '../../../selectors';
import { IState } from '../../../models';
import { GetMoleculesButtonComponent } from './GetMoleculesButton';
import Grid from  '@material-ui/core/Grid';


interface IMongoDbFieldsProps
{
    url: string;
    database: string;
    moleculeCollection: string;
    positionMatrixCollection: string;
    numEntriesPerPage: number;
}


function MongoDbFields(props: IMongoDbFieldsProps)
{
    const [url, setUrl]
        = React.useState(props.url);

    const [database, setDatabase]
        = React.useState(props.database);

    const [moleculeCollection, setMoleculeCollection]
        = React.useState(props.moleculeCollection);

    const [positionMatrixCollection, setPositionMatrixCollection]
        = React.useState(props.positionMatrixCollection);

    const [numEntriesPerPage, setNumEntriesPerPage]
        = React.useState(props.numEntriesPerPage);

    return (
        <Grid container
            alignItems={ 'center' }
            alignContent={ 'center' }
            justify={ 'center' }
            spacing={ 3 }
            style={ {height: '100%'} }
            direction='column'
        >
            <Grid container
                alignItems={ 'center' }
                alignContent={ 'center' }
                justify={ 'center' }
                spacing={ 4 }
                style={ {height: '100%'} }
            >
                <Grid item><TextField
                    id='mongo-url'
                    label='MongoDB URL'
                    defaultValue={ props.url }
                    variant='outlined'
                    onChange={ (e) => { setUrl(e.target.value)  } }
                /></Grid>
                <Grid item><TextField
                    id='mongo-database'
                    label='Database Name'
                    defaultValue={ props.database }
                    variant='outlined'
                    onChange={ (e) => { setDatabase(e.target.value) } }
                /></Grid>
                <Grid item><TextField
                    id='mongo-molecule-collection'
                    label='Molecule Collection Name'
                    defaultValue={ props.moleculeCollection }
                    variant='outlined'
                    onChange={
                        (e) => {
                            setMoleculeCollection(e.target.value)
                        }
                    }
                /></Grid>
                <Grid item><TextField
                    id='mongo-position-matrix-collection'
                    label='Position Matrix Collection Name'
                    defaultValue={ props.positionMatrixCollection }
                    variant='outlined'
                    onChange={
                        (e) => {
                            setPositionMatrixCollection(e.target.value)
                        }
                    }
                /></Grid>
                <Grid item><TextField
                    id='num-entries-per-age'
                    label='Entries Per Page'
                    defaultValue={ props.numEntriesPerPage }
                    variant='outlined'
                    onChange={
                        (e) => {
                            setNumEntriesPerPage(
                                parseInt(e.target.value)
                            )
                        }
                    }
                /></Grid>
            </Grid>
            <Grid item>
                <GetMoleculesButtonComponent
                    url={ url }
                    database={ database }
                    moleculeCollection={ moleculeCollection }
                    positionMatrixCollection={
                        positionMatrixCollection
                    }
                    numEntriesPerPage={ numEntriesPerPage }
                />
            </Grid>
        </Grid>
    );
}


function mapStateToProps(
    state: IState,
)
{
    return {
        url:
            getMongoDbUrl(state),

        database:
            getMongoDbDatabase(state),

        moleculeCollection:
            getMongoDbMoleculeCollection(state),

        positionMatrixCollection:
            getMongoDbPositionMatrixCollection(state),

        numEntriesPerPage:
            getNumEntriesPerPage(state),
    }
}



export const MongoDbFieldsComponent
    = connect(mapStateToProps)(MongoDbFields);
