import * as React from 'react';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import {
    updateFields,
    IAction,
} from 'StkVis.Action';
import {
    unsortedBuildingBlocks,
} from 'MongoConfigurator.SearchKind';
import {
    IMongoData
} from 'MongoConfigurator.UpdateFields.MongoData';
import {
    request,
} from 'mongo-db-requests/unsorted-building-blocks';
import {
    IPageData,
} from 'MoleculeBrowser.UpdateMoleculePage';


interface BaseProps
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
    updateMoleculePage: (pageData: IPageData) => void;
}


interface Props extends BaseProps
{
    button: React.FunctionComponent<ButtonProps>;
}


interface ButtonProps
{
    onClick: () => void;
}


export function UnsortedBuildingBlocksButton(
    props: Props,
)
{
    return (
        <props.button
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
                        searchKind: unsortedBuildingBlocks,
                    });
                    request({
                        url: props.url,

                        database: props.database,

                        moleculeKey: props.moleculeKey,

                        moleculeCollection: props.moleculeCollection,

                        constructedMoleculeCollection:
                            props.constructedMoleculeCollection,

                        positionMatrixCollection:
                            props.positionMatrixCollection,

                        numEntriesPerPage:
                            props.numEntriesPerPage,

                        ignoredCollections: [],

                        pageIndex: 0,

                    })
                    .then(result => props.updateMoleculePage(result));
                }
            }
        >
            <SearchIcon />
        </props.button>
    );
}
