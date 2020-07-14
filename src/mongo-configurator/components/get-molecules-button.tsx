import * as React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from '@reduxjs/toolkit';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';


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
    selectBuildingBlocks: boolean;
    selectConstructedMolecules: boolean;
}


export function GetMoleculesButton(
    props: Props,
)
{
    return (
        <Button disabled={ true }>
            <SearchIcon />
        </Button>
    );
}
