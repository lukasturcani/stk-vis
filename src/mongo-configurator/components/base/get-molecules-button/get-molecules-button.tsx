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
import { Action } from 'StkVis.Action';
import {
    MongoData
} from 'MongoConfigurator.UpdateFields.MongoData';
import {
    PageData,
} from 'MoleculeBrowser.UpdateMoleculePage.PageData';
import {
    IMolecule,
} from 'mongo-db-requests/types/IMolecule';
import {
    PageKind,
} from 'mongo-db-requests/types/PageKind';


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
    updateFields: (mongoData: MongoData) => void;
    updateMoleculePage: (pageData: PageData) => void;
    initializeMoleculeBrowser:
        ( molecules: IMolecule[]
        , pageKind: PageKind
        , valueCollections: string[]
        , moleculeKey: string
        ) => void;
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
