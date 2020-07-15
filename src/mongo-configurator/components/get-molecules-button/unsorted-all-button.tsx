import * as React from 'react';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import {
    createAction,
    unsortedAll,
} from 'MongoConfigurator.UpdateFields';


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
}


export function UnsortedAllButton(
    props: Props,
)
{
    return (
        <Button
            onClick={
                () => {
                    const action = createAction({
                        url: props.url,
                        moleculeKey: props.moleculeKey,
                        database: props.database,
                        moleculeCollection: props.moleculeCollection,
                        constructedMoleculeCollection:
                            props.constructedMoleculeCollection,
                        positionMatrixCollection:
                            props.positionMatrixCollection,
                        buildingBlocksPositionMatrixCollection:
                            props.buildingBlockPositionMatrixCollection,
                        numEntriesPerPage: props.numEntriesPerPage,
                        searchKind: unsortedAll,
                    });
                    console.log(action);
                }
            }
        >
            <SearchIcon />
        </Button>
    );
}
