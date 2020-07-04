import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import * as React from 'react';
import {
    getMongoDbUrl,
    getMongoDbDatabase,
    getMongoDbMoleculeCollection,
    getMongoDbConstructedMoleculeCollection,
    getMongoDbPositionMatrixCollection,
    getMongoDbBuildingBlockPositionMatrixCollection,
    getNumEntriesPerPage,
    getMoleculeSelectionType,
} from '../../../selectors';
import {
    IState,
    IMoleculeSelectionType,
    MoleculeSelectionTypeKind,
} from '../../../models';
import { GetMoleculesButtonComponent } from './GetMoleculesButton';
import Grid from  '@material-ui/core/Grid';
import {
    MoleculeTypeSelectorComponent
} from './MoleculeTypeSelection';


interface IMongoDbFieldsProps
{
    url: string;
    database: string;
    moleculeCollection: string;
    constructedMoleculeCollection: string;
    positionMatrixCollection: string;
    buildingBlockPositionMatrixCollection: string;
    numEntriesPerPage: number;
    selectBuildingBlocks: boolean;
    selectConstructedMolecules: boolean;
}


function MongoDbFields(props: IMongoDbFieldsProps)
{
    const [url, setUrl]
        = React.useState(props.url);

    const [database, setDatabase]
        = React.useState(props.database);

    const [moleculeCollection, setMoleculeCollection]
        = React.useState(props.moleculeCollection);

    const [
        constructedMoleculeCollection,
        setConstructedMoleculeCollection,
    ]
        = React.useState(props.constructedMoleculeCollection);

    const [positionMatrixCollection, setPositionMatrixCollection]
        = React.useState(props.positionMatrixCollection);

    const [
        buildingBlockPositionMatrixCollection,
        setBBPositionMatrixCollection,
    ]
        = React.useState(props.buildingBlockPositionMatrixCollection);

    const [numEntriesPerPage, setNumEntriesPerPage]
        = React.useState(props.numEntriesPerPage);

    const [moleculeTypeSelectionError, setMoleculeTypeSelectionError]
        = React.useState(false);

    const [selectBuildingBlocks, setSelectBuildingBlocks]
        = React.useState(props.selectBuildingBlocks);

    const [selectConstructedMolecules, setSelectConstructedMolecules]
        = React.useState(props.selectConstructedMolecules);

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
                <Grid item
                >
                    <MoleculeTypeSelectorComponent
                        setError= { setMoleculeTypeSelectionError }
                        buildingBlocks={ selectBuildingBlocks }
                        setBuildingBlocks={ setSelectBuildingBlocks }
                        constructedMolecules={
                            selectConstructedMolecules
                        }
                        setConstructedMolecules={
                            setSelectConstructedMolecules
                        }
                    />
                </Grid>
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
                    id='mongo-constructed-molecule-collection'
                    label='Constructed Molecule Collection Name'
                    defaultValue={
                        props.constructedMoleculeCollection
                    }
                    variant='outlined'
                    onChange={
                        (e) => {
                            setConstructedMoleculeCollection(
                                e.target.value
                            )
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
                {
                    selectBuildingBlocks
                    &&
                    selectConstructedMolecules
                    &&
                    <Grid item><TextField
                        id={
                            'mongo-building-block-'
                            +'position-matrix-collection'
                        }
                        label={
                            'Building Block '
                            +'Position Matrix Collection Name'
                        }
                        defaultValue={
                            props.buildingBlockPositionMatrixCollection
                        }
                        variant='outlined'
                        onChange={
                            (e) => {
                                setBBPositionMatrixCollection(
                                    e.target.value
                                )
                            }
                        }
                    /></Grid>
                }
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
                    constructedMoleculeCollection={
                        constructedMoleculeCollection
                    }
                    positionMatrixCollection={
                        positionMatrixCollection
                    }
                    buildingBlockPositionMatrixCollection={
                        buildingBlockPositionMatrixCollection
                    }
                    numEntriesPerPage={ numEntriesPerPage }
                    moleculeTypeSelectionError={
                        moleculeTypeSelectionError
                    }
                    selectBuildingBlocks={ selectBuildingBlocks }
                    selectConstructedMolecules={
                        selectConstructedMolecules
                    }
                />
            </Grid>
        </Grid>
    );
}


function mapStateToProps(
    state: IState,
)
{
    const selectionType: IMoleculeSelectionType
        = getMoleculeSelectionType(state);

    return {
        url:
            getMongoDbUrl(state),

        database:
            getMongoDbDatabase(state),

        moleculeCollection:
            getMongoDbMoleculeCollection(state),

        constructedMoleculeCollection:
            getMongoDbConstructedMoleculeCollection(state),

        positionMatrixCollection:
            getMongoDbPositionMatrixCollection(state),

        buildingBlockPositionMatrixCollection:
            getMongoDbBuildingBlockPositionMatrixCollection(state),

        numEntriesPerPage:
            getNumEntriesPerPage(state),

        selectBuildingBlocks: (
            (selectionType.kind === MoleculeSelectionTypeKind.Both)
            ||
            (
                selectionType.kind
                ===
                MoleculeSelectionTypeKind.BuildingBlocks
            )
        ),
        selectConstructedMolecules: (
            (selectionType.kind === MoleculeSelectionTypeKind.Both)
            ||
            (
                selectionType.kind
                ===
                MoleculeSelectionTypeKind.ConstructedMolecules
            )
        ),

    }
}



export const MongoDbFieldsComponent
    = connect(mapStateToProps)(MongoDbFields);
