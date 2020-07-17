import * as React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import { UnsortedAllButton } from './unsorted-all-button';
import {
    UnsortedBuildingBlocksButton,
} from './unsorted-building-blocks-button';
import {
    UnsortedConstructedMoleculesButton,
} from './unsorted-constructed-molecules-button';
import { IAction } from 'StkVis.Action';
import {
    IMongoData
} from 'MongoConfigurator.UpdateFields.MongoData';


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
    updateFields: (mongoData: IMongoData) => void;
}


export function GetMoleculesButton(
    props: Props,
)
{
    if (
        props.selectBuildingBlocks && props.selectConstructedMolecules
    ) {
        return <UnsortedAllButton { ...props } />;
    }
    if (props.selectBuildingBlocks)
    {
        return <UnsortedBuildingBlocksButton { ...props } />;
    }
    if (props.selectConstructedMolecules)
    {
        return <UnsortedConstructedMoleculesButton { ...props } />;
    }
    return (
        <Button disabled={ true }>
            <SearchIcon />
        </Button>
    );
}
