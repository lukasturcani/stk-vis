import * as React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { SearchKindSelector } from './search-kind-selector';


interface Props
{
    url: string;
    setUrl: (url: string) => void;

    moleculeKey: string;
    setMoleculeKey: (moleculeKey: string) => void;

    database: string;
    setDatabase: (database: string) => void;

    moleculeCollection: string;
    setMoleculeCollection: (collection: string) => void;

    constructedMoleculeCollection: string;
    setConstructedMoleculeCollection: (collection: string) => void;

    positionMatrixCollection: string;
    setPositionMatrixCollection: (collection: string) => void;

    buildingBlockPositionMatrixCollection: string;
    setBuildingBlockPositionMatrixCollection:
        (collection: string) => void;

    numEntriesPerPage: number;
    setNumEntriesPerPage: (numEntries: number) => void;

    selectBuildingBlocks: boolean;
    setSelectBuildingBlocks: (select: boolean) => void;

    selectConstructedMolecules: boolean;
    setSelectConstructedMolecules: (select: boolean) => void;
}


export function InputFields(
    props: Props,
)
{
    const setBBPosMatCollection: (collection: string) => void
        = props.setBuildingBlockPositionMatrixCollection;

    return (
        <Grid container>
            <Grid item>
                <SearchKindSelector
                    buildingBlocks={ props.selectBuildingBlocks }
                    setBuildingBlocks={ props.setSelectBuildingBlocks }

                    constructedMolecules={
                        props.selectConstructedMolecules
                    }
                    setConstructedMolecules={
                        props.setSelectConstructedMolecules
                    }
                />
            </Grid>
            <Grid item>
                <TextField
                    id='mongo-url'
                    label='MongoDB URL'
                    defaultValue={ props.url }
                    variant='outlined'
                    onChange={ (e) => props.setUrl(e.target.value) }
                />
            </Grid>
            <Grid item>
                <TextField
                    id='mongo-molecule-key'
                    label='Molecule Key Name'
                    defaultValue={ props.moleculeKey }
                    variant='outlined'
                    onChange={
                        (e) => props.setMoleculeKey(e.target.value)
                    }
                />
            </Grid>
            <Grid item>
                <TextField
                    id='mongo-database'
                    label='Database Name'
                    defaultValue={ props.database }
                    variant='outlined'
                    onChange={
                        (e) => props.setDatabase(e.target.value)
                    }
                />
            </Grid>
            <Grid item>
                <TextField
                    id='mongo-molecule-collection'
                    label='Molecule Collection Name'
                    defaultValue={ props.moleculeCollection }
                    variant='outlined'
                    onChange={
                        (e) => props.setMoleculeCollection(
                            e.target.value
                        )
                    }
                />
            </Grid>
            <Grid item>
                <TextField
                    id='mongo-constructed-molecule-collection'
                    label='Constructed Molecule Collection Name'
                    defaultValue={
                        props.constructedMoleculeCollection
                    }
                    variant='outlined'
                    onChange={
                        (e) => props.setConstructedMoleculeCollection(
                            e.target.value
                        )
                    }
                />
            </Grid>
            <Grid item>
                <TextField
                    id='mongo-position-matrix-collection'
                    label='Position Matrix Collection Name'
                    defaultValue={ props.positionMatrixCollection }
                    variant='outlined'
                    onChange={
                        (e) => props.setPositionMatrixCollection(
                            e.target.value
                        )
                    }
                />
            </Grid>
            {
                props.selectBuildingBlocks
                &&
                props.selectConstructedMolecules
                &&
                <Grid item>
                    <TextField
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
                            (e) => setBBPosMatCollection(
                                e.target.value
                            )
                        }
                    />
                </Grid>
            }
            <Grid item>
                <TextField
                    id='num-entries-per-age'
                    label='Entries Per Page'
                    defaultValue={ props.numEntriesPerPage }
                    variant='outlined'
                    onChange={
                        (e) => props.setNumEntriesPerPage(
                            parseInt(e.target.value)
                        )
                    }
                />
            </Grid>
        </Grid>
    );
}
