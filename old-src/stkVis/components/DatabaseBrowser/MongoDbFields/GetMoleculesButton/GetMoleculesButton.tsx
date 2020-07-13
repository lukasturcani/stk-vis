import * as React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from '@reduxjs/toolkit';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import { UnsortedAllButton } from './UnsortedAllButton';
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
    constructedMoleculeCollection: string;
    positionMatrixCollection: string;
    buildingBlockPositionMatrixCollection: string;
    numEntriesPerPage: number;
    selectBuildingBlocks: boolean;
    selectConstructedMolecules: boolean;
}


function GetMoleculesButton(
    props: Props,
)
{
    if (props.selectBuildingBlocks && props.selectConstructedMolecules)
    {
        return <UnsortedAllButton { ...props } />;
    }

    return (
        <Button disabled={ true }>
            <SearchIcon />
        </Button>
    );
}


function mapDispatchToProps(
    dispatch: (action: AnyAction) => void
)
{
    return {

        updateTable: (payload: updateTable.Payload) => (
            dispatch(updateTable.updateTable(payload))
        ),

        updateMongoDbFields: (payload: mongoUpdate.Payload) => (
            dispatch(mongoUpdate.updateMongoDbFields(payload))
        ),

    };
}


export const GetMoleculesButtonComponent
    = connect(undefined, mapDispatchToProps)(GetMoleculesButton);
