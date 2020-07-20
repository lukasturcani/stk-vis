import * as React from 'react';
import {
    IMongoData
} from 'MongoConfigurator.UpdateFields.MongoData';
import {
    IPageData,
} from 'MoleculeBrowser.UpdateMoleculePage';
import {
    GetMoleculesButton as GetMoleculesButtonBase,
} from 'mongo-configurator/components/get-molecules-button';
import { DisabledButton } from './disabled-button';
import { EnabledButton } from './enabled-button';


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
    updateMoleculePage: (pageData: IPageData) => void;
}

export function GetMoleculesButton(
    props: Props,
)
{
    return <GetMoleculesButtonBase
        disabledButton={ DisabledButton }
        enabledButton={ EnabledButton }
        { ...props }
    />;
}
