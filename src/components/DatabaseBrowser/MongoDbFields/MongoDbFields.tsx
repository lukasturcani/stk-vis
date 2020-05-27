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
        <div>
            <TextField
                id='mongo-url'
                label='MongoDB URL'
                value={ props.url }
                variant='outlined'
                onChange={ props.dispatchUrlUpdate }
            />
            <TextField
                id='mongo-database'
                label='Database Name'
                value={ props.database }
                variant='outlined'
                onChange={ props.dispatchDatabaseUpdate }
            />
            <TextField
                id='mongo-molecule-collection'
                label='Molecule Collection Name'
                value={ props.moleculeCollection }
                variant='outlined'
                onChange={ props.dispatchMoleculeCollectionUpdate }
            />
            <TextField
                id='mongo-position-matrix-collection'
                label='Position Matrix Collection Name'
                value={ props.positionMatrixCollection }
                variant='outlined'
                onChange={
                    props.dispatchPositionMatrixCollectionUpdate
                }
            />
            <GetMoleculesButtonComponent />
        </div>
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
