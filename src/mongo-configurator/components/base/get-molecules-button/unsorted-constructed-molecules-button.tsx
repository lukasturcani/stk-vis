import * as React from 'react';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import {
    updateFields,
    Action,
} from 'StkVis.Action';
import {
    unsortedConstructedMolecules,
} from 'MongoConfigurator.SearchKind';
import {
    MongoData
} from 'MongoConfigurator.UpdateFields.MongoData';
import {
    request,
} from 'mongo-db-requests/unsorted-constructed-molecules';
import {
    PageData,
} from 'MoleculeBrowser.UpdateMoleculePage.PageData';


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
    updateFields: (mongoData: MongoData) => void;
    updateMoleculePage: (pageData: PageData) => void;
}


interface Props extends BaseProps
{
    button: React.FunctionComponent<ButtonProps>;
}


interface ButtonProps
{
    onClick: () => void;
}


export function UnsortedConstructedMoleculesButton(
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
                        searchKind: unsortedConstructedMolecules,
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
