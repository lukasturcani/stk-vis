import * as React from 'react';
import { connect } from 'react-redux';
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
import {
    IPageData,
} from 'MoleculeBrowser.UpdateMoleculePage';


export interface BaseProps
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
    updateMoleculePage: (pageData: IPageData) => void;
}


interface Props extends BaseProps
{
    enabledButton: React.FunctionComponent<EnabledButtonProps>;
    disabledButton: React.FunctionComponent<Record<string, unknown>>;
}


export interface EnabledButtonProps
{
    onClick: () => void;
}


export function GetMoleculesButton(
    props: Props,
)
{
    if (
        props.selectBuildingBlocks && props.selectConstructedMolecules
    ) {
        return (
            <UnsortedAllButton
                button={ props.enabledButton }
                { ...props }
            />
        );
    }
    if (props.selectBuildingBlocks)
    {
        return (
            <UnsortedBuildingBlocksButton
                button={ props.enabledButton }
                { ...props }
            />
        );
    }
    if (props.selectConstructedMolecules)
    {
        return (
            <UnsortedConstructedMoleculesButton
                button={ props.enabledButton }
                { ...props }
            />
        );
    }
    return (
        <props.disabledButton>
            <SearchIcon />
        </props.disabledButton>
    );
}
