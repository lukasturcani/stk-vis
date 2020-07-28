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
    request,
} from 'mongo-db-requests/unsorted-all';
import {
    MongoData
} from 'MongoConfigurator.UpdateFields.MongoData';
import {
    PageData,
} from 'MoleculeBrowser.UpdateMoleculePage.PageData';
import {
    ResultKind,
} from 'mongo-db-requests/unsorted-all';
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
    initializeMoleculeBrowser:
        ( molecules: IMolecule[]
        , pageKind: PageKind
        , valueCollections: string[]
        ) => void;
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

                    })
                    .then(result => {
                        switch (result.kind)
                        {
                            case ResultKind.Success:
                            {
                                props.initializeMoleculeBrowser(
                                    result.molecules,
                                    result.pageKind,
                                    result.valueCollections,
                                );
                                break;
                            }
                            case ResultKind.DatabaseConnectionError:
                            {
                                console.log('database error');
                                break;
                            }
                            case ResultKind.CollectionConnectionError:
                            {
                                console.log('collection error');
                                break;
                            }
                            case ResultKind.UncategorizedError:
                            {
                                console.log('uncategorized error');
                                break;
                            }

                        }
                    });
                }
            }
        >
            <SearchIcon />
        </props.button>
    );
}
