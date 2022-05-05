import * as React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {
    BaseProps as SearchKindSelectorProps,
} from './search-kind-selector';


export interface BaseProps
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

    showTwoD: boolean;
    setShowTwoD: (show: boolean) => void;

    showThreeD: boolean;
    setShowThreeD: (show: boolean) => void;
}


interface Props extends BaseProps
{
    component: React.FunctionComponent<Record<string, unknown>>;
    searchKindSelector:
        React.FunctionComponent<SearchKindSelectorProps>;
}


export function InputFields(
    props: Props,
)
{
    const setBBPosMatCollection: (collection: string) => void
        = props.setBuildingBlockPositionMatrixCollection;

    return (
        <props.component>
            <Grid item>
                <props.searchKindSelector
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
                    value={ props.url }
                    onChange={ (e) => props.setUrl(e.target.value) }
                />
            </Grid>
            <Grid item>
                <TextField
                    id='mongo-molecule-key'
                    label='Molecule Key Name'
                    value={ props.moleculeKey }
                    onChange={
                        (e) => props.setMoleculeKey(e.target.value)
                    }
                />
            </Grid>
            <Grid item>
                <TextField
                    id='mongo-database'
                    label='Database Name'
                    value={ props.database }
                    onChange={
                        (e) => props.setDatabase(e.target.value)
                    }
                />
            </Grid>
            <Grid item>
                <TextField
                    id='mongo-molecule-collection'
                    label='Molecule Collection Name'
                    value={ props.moleculeCollection }
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
                    value={
                        props.constructedMoleculeCollection
                    }
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
                    value={ props.positionMatrixCollection }
                    onChange={
                        (e) => props.setPositionMatrixCollection(
                            e.target.value
                        )
                    }
                />
            </Grid>
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
                    value={
                        props.buildingBlockPositionMatrixCollection
                    }
                    onChange={
                        (e) => setBBPosMatCollection(
                            e.target.value
                        )
                    }
                />
            </Grid>
            <Grid item>
                <TextField
                    id='num-entries-per-age'
                    label='Entries Per Page'
                    value={ props.numEntriesPerPage }
                    onChange={
                        (e) => {
                            const value: string = e.target.value;

                            if (!value)
                            {
                                props.setNumEntriesPerPage(0)
                                return;
                            }

                            const parsed: number = Number(value);

                            if (!isNaN(parsed))
                            {
                                props.setNumEntriesPerPage(parsed)
                                return;
                            }
                        }
                    }
                />
            </Grid>
            <Grid item>
                <FormGroup row>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={props.showTwoD}
                                onChange={
                                    (event: any) =>
                                        props.setShowTwoD(
                                            event.target.checked
                                        )
                                }
                                name='showTwoD'
                            />
                        }
                        label='2D Viewer'
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={props.showThreeD}
                                onChange={
                                    (event: any) =>
                                        props.setShowThreeD(
                                            event.target.checked
                                        )
                                }
                                name='showThreeD'
                            />
                        }
                        label='3D Viewer'
                    />
                </FormGroup>
            </Grid>
        </props.component>
    );
}
