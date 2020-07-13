import Button from '@material-ui/core/Button';
import * as React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import {
    request,
} from 'mongo-db-requests/unsorted-all';
import { handleResult } from './handleResult';
import * as updateTable from 'actions/updateTable';
import * as mongoUpdate from 'actions/updateMongoDbFields';


interface Props
{
    updateTable: (payload: updateTable.Payload) => void;
    updateMongoDbFields: (payload: mongoUpdate.Payload) => void;
    url: string;
    moleculeKey: string;
    database: string;
    moleculeCollection: string;
    positionMatrixCollection: string;
    constructedMoleculeCollection: string;
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
                    props.updateMongoDbFields(props);
                    request({
                        ...props,
                        ignoredCollections: [],
                        pageIndex: 0,
                    })
                    .then(handleResult({
                        updateTable: props.updateTable,
                    }))
                }
            }
        >
            <SearchIcon />
        </Button>
    );
}
