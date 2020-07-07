import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import * as React from 'react';
import {
    getMongoDbUrl,
    getMongoDbMoleculeKey,
    getMongoDbDatabase,
    getMongoDbMoleculeCollection,
    getMongoDbConstructedMoleculeCollection,
    getMongoDbPositionMatrixCollection,
    getMongoDbBuildingBlockPositionMatrixCollection,
    getNumEntriesPerPage,
} from '../../../selectors';
import {
    IState,
    SearchKind,
} from '../../../models';
import { GetMoleculesButtonComponent } from './GetMoleculesButton';
import Grid from  '@material-ui/core/Grid';
import {
    MoleculeTypeSelectorComponent
} from './MoleculeTypeSelection';


interface IMongoDbFieldsProps
{
    url: string;
    moleculeKey: string;
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

    const [moleculeKey, setMoleculeKey]
        = React.useState(props.moleculeKey);

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
                    id='mongo-molecule-key'
                    label='Molecule Key Name'
                    defaultValue={ props.moleculeKey }
                    variant='outlined'
                    onChange={
                        (e) => { setMoleculeKey(e.target.value)  }
                    }
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
                    moleculeKey={ moleculeKey }
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
    const searchKind: SearchKind
        = state.searchKind

    const bBPosMatCol: string
        = getBuildingBlockPositionMatrixCollection(state);

    return {
        url:
            getMongoDbUrl(state),

        moleculeKey:
            getMongoDbMoleculeKey(state),

        database:
            getMongoDbDatabase(state),

        moleculeCollection:
            getMongoDbMoleculeCollection(state),

        constructedMoleculeCollection:
            getMongoDbConstructedMoleculeCollection(state),

        positionMatrixCollection:
            getMongoDbPositionMatrixCollection(state),

        buildingBlockPositionMatrixCollection:
            bBPosMatCol,

        numEntriesPerPage:
            getNumEntriesPerPage(state),

        selectBuildingBlocks: (
            (searchKind === SearchKind.UnsortedBoth)
            ||
            (searchKind === SearchKind.SortedBoth)
            ||
            (searchKind === SearchKind.SortedBuildingBlocks)
            ||
            (searchKind === SearchKind.UnsortedBuildingBlocks)
        ),
        selectConstructedMolecules: (
            (searchKind === SearchKind.UnsortedBoth)
            ||
            (searchKind === SearchKind.SortedBoth)
            ||
            (searchKind === SearchKind.SortedConstructedMolecules)
            ||
            (searchKind === SearchKind.UnsortedConstructedMolecules)
        ),

    }
}


function getBuildingBlockPositionMatrixCollection(
    state: IState,
)
    : string
{
    switch (state.searchKind)
    {
        case SearchKind.SortedBoth:
        case SearchKind.UnsortedBoth:
        {
            return getMongoDbBuildingBlockPositionMatrixCollection(
                state,
            );
        }

        default:
        {
            return 'building_block_position_matrices';
        }
    }
}



export const MongoDbFieldsComponent
    = connect(mapStateToProps)(MongoDbFields);
