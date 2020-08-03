import * as React from 'react';
import { BaseProps as InputFieldsProps  } from './input-fields';
import {
    BaseProps as GetMoleculesButtonProps,
} from './get-molecules-button';
import Grid from '@material-ui/core/Grid';
import {
    MongoData
} from 'MongoConfigurator.UpdateFields.MongoData';
import {
    PageData,
} from 'MoleculeBrowser.UpdateMoleculePage.PageData';
import {
    Props as BaseProps,
} from 'MongoConfigurator.MongoConfigurator';
import {
    IMolecule,
} from 'mongo-db-requests/types/IMolecule';
import {
    PageKind,
} from 'mongo-db-requests/types/PageKind';


export interface DispatchProps
{
    updateFields: (mongoData: MongoData) => void;
    updateMoleculePage: (pageData: PageData) => void;
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
        = React.useState(props.value0.url);

    const [moleculeKey, setMoleculeKey]
        = React.useState(props.value0.moleculeKey);

    const [database, setDatabase]
        = React.useState(props.value0.database);

    const [moleculeCollection, setMoleculeCollection]
        = React.useState(props.value0.moleculeCollection);

    const [
        constructedMoleculeCollection,
        setConstructedMoleculeCollection,
    ]
        = React.useState(props.value0.constructedMoleculeCollection);

    const [positionMatrixCollection, setPositionMatrixCollection]
        = React.useState(props.value0.positionMatrixCollection);

    const [
        buildingBlockPositionMatrixCollection,
        setBuildingBlockPositionMatrixCollection,
    ]
        = React.useState(
            props.value0.buildingBlockPositionMatrixCollection
        );

    const [numEntriesPerPage, setNumEntriesPerPage]
        = React.useState(props.value0.numEntriesPerPage);

    const [selectBuildingBlocks, setSelectBuildingBlocks]
        = React.useState(props.value0.selectBuildingBlocks);

    const [selectConstructedMolecules, setSelectConstructedMolecules]
        = React.useState(props.value0.selectConstructedMolecules);

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
