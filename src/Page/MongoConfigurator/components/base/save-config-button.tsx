import * as React from 'react';
import {
    MongoData,
} from 'Page.MongoConfigurator';

const fs = require('fs');
const path = require('path');
const os = require('os');
const { remote } = require('electron');
const { dialog } = remote;


type Empty = Record<string, unknown>;

export interface ButtonProps
{
    onClick: () => void;
}

interface Props extends MongoData
{
    button: React.FunctionComponent<ButtonProps>;
}


export function SaveConfigButton(props: Props)
{
    return <props.button
        onClick={ () => {
            const filename: string | undefined
                = dialog.showSaveDialogSync(
                    undefined,
                    {
                        defaultPath: path.join(
                            os.homedir(),
                            'stk-vis-mongo-config.json',
                        ),
                    },
                );
            if (typeof filename === "string")
            {
                const config: MongoData
                    = {
                        url: props.url,
                        moleculeKey: props.moleculeKey,
                        database: props.database,
                        moleculeCollection:
                            props.moleculeCollection,
                        constructedMoleculeCollection:
                            props.constructedMoleculeCollection,
                        positionMatrixCollection:
                            props.positionMatrixCollection,
                        buildingBlockPositionMatrixCollection:
                            props.buildingBlockPositionMatrixCollection,
                        numEntriesPerPage:
                            props.numEntriesPerPage,
                        selectBuildingBlocks:
                            props.selectBuildingBlocks,
                        selectConstructedMolecules:
                            props.selectConstructedMolecules,
                        twoDViewer: props.twoDViewer,
                        threeDViewer: props.threeDViewer,
                    };

                fs.writeFileSync(
                    filename,
                    JSON.stringify(config),
                    'utf-8',
                );
            }
        } }
    />;
}
