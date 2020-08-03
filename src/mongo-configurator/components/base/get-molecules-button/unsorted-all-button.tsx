import * as React from 'react';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import {
    updateFields,
    Action,
} from 'StkVis.Action';
import {
    unsortedAll,
} from 'MongoConfigurator.SearchKind';
import {
    MongoData
} from 'MongoConfigurator.UpdateFields.MongoData';
import {
    PageData,
} from 'MoleculeBrowser.UpdateMoleculePage.PageData';
import {
    request,
    Result,
} from 'Requests.UnsortedAll';
import {
    IMolecule,
} from 'mongo-db-requests/types/IMolecule';
import {
    PageKind,
} from 'mongo-db-requests/types/PageKind';


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
    initializeMoleculeBrowser: (result: Result) => void;
}


interface Props extends BaseProps
{
    button: React.FunctionComponent<ButtonProps>;
}


interface ButtonProps
{
    onClick: () => void;
}


export function UnsortedAllButton(
    props: Props,
)
{
    return (
        <props.button
            onClick={
                () => {
                    const bbPosMatCol
                        = props.buildingBlockPositionMatrixCollection;

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
                            bbPosMatCol,
                        numEntriesPerPage: props.numEntriesPerPage,
                        searchKind: unsortedAll,
                    });
                    request()({
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

                    })
                    .then(result => {
                        console.log(result);
                    });
                }
            }
        >
            <SearchIcon />
        </props.button>
    );
}
