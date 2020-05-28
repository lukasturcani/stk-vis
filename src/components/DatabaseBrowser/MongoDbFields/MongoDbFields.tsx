import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import * as React from 'react';
import {
    getMongoDbUrl,
    getMongoDbDatabase,
    getMongoDbMoleculeCollection,
    getMongoDbPositionMatrixCollection,
} from '../../../selectors';
import { IState } from '../../../models';
import { GetMoleculesButtonComponent } from './GetMoleculesButton';
import {
    updateMongoDbUrl,
    updateMongoDbDatabase,
    updateMongoDbMoleculeCollection,
    updateMongoDbPositionMatrixCollection,
} from '../../../actions';
import Paper from '@material-ui/core/Paper';
import Grid from  '@material-ui/core/Grid';


interface IEvent
{
    target: {value: string},
}


interface IMongoDbFieldsProps
{
    url: string;
    dispatchUrlUpdate: (e: IEvent) => void;

    database: string;
    dispatchDatabaseUpdate: (e: IEvent) => void;

    moleculeCollection: string;
    dispatchMoleculeCollectionUpdate: (e: IEvent) => void;

    positionMatrixCollection: string;
    dispatchPositionMatrixCollectionUpdate: (e: IEvent) => void;
}


function MongoDbFields(props: IMongoDbFieldsProps)
{
    return (
        <Paper><Grid container
            alignItems={ 'center' }
            alignContent={ 'center' }
            justify={ 'center' }
            spacing={ 3 }
            style={ {height: '100%'} }
        >
            <Grid item><TextField
                id='mongo-url'
                label='MongoDB URL'
                value={ props.url }
                variant='outlined'
                onChange={ props.dispatchUrlUpdate }
            /></Grid>
            <Grid item><TextField
                id='mongo-database'
                label='Database Name'
                value={ props.database }
                variant='outlined'
                onChange={ props.dispatchDatabaseUpdate }
            /></Grid>
            <Grid item><TextField
                id='mongo-molecule-collection'
                label='Molecule Collection Name'
                value={ props.moleculeCollection }
                variant='outlined'
                onChange={ props.dispatchMoleculeCollectionUpdate }
            /></Grid>
            <Grid item><TextField
                id='mongo-position-matrix-collection'
                label='Position Matrix Collection Name'
                value={ props.positionMatrixCollection }
                variant='outlined'
                onChange={
                    props.dispatchPositionMatrixCollectionUpdate
                }
            /></Grid>
            <Grid item>
                <GetMoleculesButtonComponent />
            </Grid>
        </Grid></Paper>
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
    }
}


function mapDispatchToProps(
    dispatch: (action: any) => void
)
{
    return {
        dispatchUrlUpdate:
            (e: IEvent) => dispatch(
                updateMongoDbUrl(e.target.value)
            ),

        dispatchDatabaseUpdate:
            (e: IEvent) => dispatch(
                updateMongoDbDatabase(e.target.value)
            ),

        dispatchMoleculeCollectionUpdate:
            (e: IEvent) => dispatch(
                updateMongoDbMoleculeCollection(e.target.value)
            ),

        dispatchPositionMatrixCollectionUpdate:
            (e: IEvent) => dispatch(
                updateMongoDbPositionMatrixCollection(e.target.value)
            ),
    };
}




export const MongoDbFieldsComponent
    = connect(mapStateToProps, mapDispatchToProps)(MongoDbFields);
