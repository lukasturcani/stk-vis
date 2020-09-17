import * as React from 'react';
import {
    MongoData,
} from 'Page.MongoConfigurator';
import { readConfig } from './read-config';

const fs = require('fs');
const os = require('os');
const { remote } = require('electron');
const { dialog } = remote;


type Empty = Record<string, unknown>;

export interface ButtonProps
{
    onClick: () => void;
}

export interface BaseProps extends MongoData
{
    setUrl: (url: string) => void;
    setDatabase: (database: string) => void;
    setMoleculeKey: (moleculeKey: string) => void;
    setMoleculeCollection: (moleculeCollection: string) => void;

    setConstructedMoleculeCollection:
        (constructedMoleculeCollection: string) => void;

    setPositionMatrixCollection:
        (positionMatrixCollection: string) => void;

    setBuildingBlockPositionMatrixCollection:
        (buildingBlockPositionMatrixCollection: string) => void;

    setNumEntriesPerPage: (numEntriesPerPage: number) => void;
    setSelectBuildingBlocks: (selectBuildingBlocks: boolean) => void;

    setSelectConstructedMolecules:
        (selectConstructedMolecules: boolean) => void;

    setTwoDViewer: (twoDViewer: boolean) => void;
    setThreeDViewer: (threeDViewer: boolean) => void;
}

interface Props extends BaseProps
{
    button: React.FunctionComponent<ButtonProps>;
}


export function LoadConfigButton(props: Props)
{
    return <props.button
        onClick={ () => {
            const filename: string | undefined
                = dialog.showOpenDialogSync(
                    undefined,
                    {
                        defaultPath: os.homedir(),
                    },
                );

            if (typeof filename !== "undefined")
            {
                const config: MongoData
                    = readConfig(filename[0], props);
                props.setUrl(config.url);
                props.setDatabase(config.database);
                props.setMoleculeKey(config.moleculeKey);
                props.setMoleculeCollection(config.moleculeCollection);
                props.setConstructedMoleculeCollection(
                    config.constructedMoleculeCollection
                );
                props.setPositionMatrixCollection(
                    config.positionMatrixCollection
                );
                props.setBuildingBlockPositionMatrixCollection(
                    config.buildingBlockPositionMatrixCollection
                );
                props.setNumEntriesPerPage(
                    config.numEntriesPerPage
                );
                props.setSelectBuildingBlocks(
                    config.selectBuildingBlocks
                );
                props.setSelectConstructedMolecules(
                    config.selectConstructedMolecules
                );
                props.setTwoDViewer(
                    config.twoDViewer
                );
                props.setThreeDViewer(
                    config.threeDViewer
                );
            }
        } }
    />;
}
