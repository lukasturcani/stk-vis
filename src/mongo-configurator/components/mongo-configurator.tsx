import * as React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { InputFields } from './input-fields';
import { GetMoleculesButton } from './get-molecules-button';


interface Props
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


function MongoConfigurator(
    props: Props,
)
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
        setBuildingBlockPositionMatrixCollection,
    ]
        = React.useState(props.buildingBlockPositionMatrixCollection);

    const [numEntriesPerPage, setNumEntriesPerPage]
        = React.useState(props.numEntriesPerPage);

    const [selectBuildingBlocks, setSelectBuildingBlocks]
        = React.useState(props.selectBuildingBlocks);

    const [selectConstructedMolecules, setSelectConstructedMolecules]
        = React.useState(props.selectConstructedMolecules);

    return (
        <Grid container>
            <InputFields
                url={ url }
                setUrl={ setUrl }

                moleculeKey={ moleculeKey }
                setMoleculeKey={ setMoleculeKey }

                database={ database }
                setDatabase={ setDatabase }

                moleculeCollection={ moleculeCollection }
                setMoleculeCollection={ setMoleculeCollection }

                constructedMoleculeCollection={
                    constructedMoleculeCollection
                }
                setConstructedMoleculeCollection={
                    setConstructedMoleculeCollection
                }

                positionMatrixCollection={ positionMatrixCollection }
                setPositionMatrixCollection={
                    setPositionMatrixCollection
                }

                buildingBlockPositionMatrixCollection={
                    buildingBlockPositionMatrixCollection
                }
                setBuildingBlockPositionMatrixCollection={
                    setBuildingBlockPositionMatrixCollection
                }

                numEntriesPerPage={ numEntriesPerPage }
                setNumEntriesPerPage={ setNumEntriesPerPage }

                selectBuildingBlocks={ selectBuildingBlocks }
                setSelectBuildingBlocks={ setSelectBuildingBlocks }

                selectConstructedMolecules={
                    selectConstructedMolecules
                }
                setSelectConstructedMolecules={
                    setSelectConstructedMolecules
                }
            />
            <Grid item>
                <GetMoleculesButton
                    url={ props.url }
                    moleculeKey={ props.moleculeKey }
                    database={ props.database }
                    moleculeCollection={ props.moleculeCollection }
                    constructedMoleculeCollection={
                        props.constructedMoleculeCollection
                    }
                    positionMatrixCollection={
                        props.positionMatrixCollection
                    }
                    buildingBlockPositionMatrixCollection={
                        props.buildingBlockPositionMatrixCollection
                    }
                    numEntriesPerPage={
                        props.numEntriesPerPage
                    }
                    selectBuildingBlocks={ props.selectBuildingBlocks }
                    selectConstructedMolecules={
                        props.selectConstructedMolecules
                    }
                />
            </Grid>
        </Grid>
    );
}
