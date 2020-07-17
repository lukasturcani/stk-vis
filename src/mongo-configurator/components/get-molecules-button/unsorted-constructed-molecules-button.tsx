import * as React from 'react';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import {
    updateFields,
    IAction,
} from 'StkVis.Action';
import {
    unsortedConstructedMolecules,
} from 'MongoConfigurator.SearchKind';
import {
    IMongoData
} from 'MongoConfigurator.UpdateFields.MongoData';


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
    updateFields: (mongoData: IMongoData) => void;
}


export function UnsortedConstructedMoleculesButton(
    props: Props,
)
{
    return (
        <Button
            onClick={
                () => {
                    props.updateFields({
                        url: props.url,
                        moleculeKey: props.moleculeKey,
                        database: props.database,
                        moleculeCollection: props.moleculeCollection,
                        constructedMoleculeCollection:
                            props.constructedMoleculeCollection,
                        positionMatrixCollection:
                            props.positionMatrixCollection,
                        buildingBlockPositionMatrixCollection:
                            props.buildingBlockPositionMatrixCollection,
                        numEntriesPerPage: props.numEntriesPerPage,
                        searchKind: unsortedConstructedMolecules,
                    });
                }
            }
        >
            <SearchIcon />
        </Button>
    );
}
