import * as React from 'react';
import { BaseProps as InputFieldsProps  } from './input-fields';
import {
    BaseProps as GetMoleculesButtonProps,
} from './get-molecules-button';
import Grid from '@material-ui/core/Grid';
import { IAction } from 'StkVis.Action';
import {
    IMongoData
} from 'MongoConfigurator.UpdateFields.MongoData';
import {
    IPageData,
} from 'MoleculeBrowser.UpdateMoleculePage';


export interface BaseProps
{

    kind: 'Mongo Configurator';
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


export interface DispatchProps
{
    updateFields: (mongoData: IMongoData) => void;
    updateMoleculePage: (pageData: IPageData) => void;
}


interface Props extends BaseProps, DispatchProps
{
    component: React.FunctionComponent<Record<string, unknown>>;
    inputFields: React.FunctionComponent<InputFieldsProps>;
    getMoleculesButton:
        React.FunctionComponent<GetMoleculesButtonProps>;
}


export function MongoConfigurator(
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
        <props.component>
            <props.inputFields
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
                <props.getMoleculesButton
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
                    updateFields={ props.updateFields }
                    updateMoleculePage={ props.updateMoleculePage }
                />
            </Grid>
        </props.component>
    );
}
