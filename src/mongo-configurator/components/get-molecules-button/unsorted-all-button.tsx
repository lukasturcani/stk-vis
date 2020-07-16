import * as React from 'react';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import {
    updateFields
} from 'StkVis.Action';
import {
    unsortedAll,
} from 'MongoConfigurator.SearchKind';


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
    dispatch: (action: any) => void;
}


export function UnsortedAllButton(
    props: Props,
)
{
    return (
        <Button
            onClick={
                () => {
                    props.dispatch(updateFields({
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
                        searchKind: unsortedAll,
                    }));
                }
            }
        >
            <SearchIcon />
        </Button>
    );
}
