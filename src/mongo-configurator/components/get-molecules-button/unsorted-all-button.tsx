import * as React from 'react';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import {
    updateFields,
    IAction,
} from 'StkVis.Action';
import {
    unsortedAll,
} from 'MongoConfigurator.SearchKind';
import {
    request,
} from 'mongo-db-requests/unsorted-all';


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
    dispatch: (action: IAction) => void;
}


export function UnsortedAllButton(
    props: Props,
)
{
    return (
        <Button
            onClick={
                () => {
                    const bbPosMatCol
                        = props.buildingBlockPositionMatrixCollection;

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
                            bbPosMatCol,
                        numEntriesPerPage: props.numEntriesPerPage,
                        searchKind: unsortedAll,
                    }));
                    request({
                        url: props.url,

                        database: props.database,

                        moleculeKey: props.moleculeKey,

                        moleculeCollection: props.moleculeCollection,

                        positionMatrixCollection:
                            props.positionMatrixCollection,

                        buildingBlockPositionMatrixCollection:
                            bbPosMatCol,

                        numEntriesPerPage:
                            props.numEntriesPerPage,

                        ignoredCollections: [],

                        pageIndex: 0,

                    });
                }
            }
        >
            <SearchIcon />
        </Button>
    );
}
