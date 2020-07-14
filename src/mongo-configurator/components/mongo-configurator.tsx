import * as React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { InputFields } from './input-fields';
import { GetMoleculesButton } from './get-molecules-button';
import * as MongoConfigurator from 'MongoConfigurator';


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


function Component(
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


function mapStateToProps(state)
{
    state = state.value0;
    let selectBuildingBlocks: boolean
        = false;

    let selectConstructedMolecules: boolean
        = false;

    const searchKind = MongoConfigurator.searchKind(state);
    if (searchKind.constructor.name === 'UnsortedAll')
    {
        selectBuildingBlocks = true;
        selectConstructedMolecules = true;
    }
    if (searchKind.constructor.name === 'UnsortedBuildingBlocks')
    {
        selectBuildingBlocks = true;
    }
    if (searchKind.constructor.name === 'UnsortedConstructedMolecules')
    {
        selectConstructedMolecules = true;
    }

    return {
        url:
            MongoConfigurator.url(state),

        moleculeKey:
            MongoConfigurator.moleculeKey(state),

        database:
            MongoConfigurator.database(state),

        moleculeCollection:
            MongoConfigurator.moleculeCollection(state),

        constructedMoleculeCollection:
            MongoConfigurator.constructedMoleculeCollection(state),

        positionMatrixCollection:
            MongoConfigurator.positionMatrixCollection(state),

        buildingBlockPositionMatrixCollection:
            MongoConfigurator.buildingBlockPositionMatrixCollection(
                state,
            ),

        numEntriesPerPage:
            MongoConfigurator.numEntriesPerPage(state),

        selectBuildingBlocks:
            selectBuildingBlocks,

        selectConstructedMolecules:
            selectConstructedMolecules,
    };
}


const ConnectedComponent
    = connect(mapStateToProps)(Component);


export { ConnectedComponent as MongoConfigurator };
