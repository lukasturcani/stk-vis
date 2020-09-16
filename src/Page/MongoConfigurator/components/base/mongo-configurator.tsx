import * as React from 'react';
import { BaseProps as InputFieldsProps  } from './input-fields';
import Grid from '@material-ui/core/Grid';
import {
    Props as BaseProps,
    MongoData,
} from 'Page.MongoConfigurator';
import {
    BaseProps as LoadConfigButtonProps,
} from '../base/load-config-button';
import { readConfig } from './read-config';

const path = require('path');
const fs = require('fs');
const { app } = require('electron').remote;
const configPath = path.join(app.getAppPath(), 'mongo-config.json');

type Empty = Record<string, unknown>;

export interface DispatchProps<a>
{
    dispatch: (action: a) => void
}

export type CoreProps<a> = BaseProps<a> & DispatchProps<a>;

interface Props<a> extends BaseProps<a>, DispatchProps<a>
{
    component: React.FunctionComponent<Record<string, unknown>>;
    inputFields: React.FunctionComponent<InputFieldsProps>;
    button: React.FunctionComponent<ButtonProps>;
    successSnackbar: React.FunctionComponent<SnackbarProps>;
    errorSnackbar: React.FunctionComponent<SnackbarProps>;
    loadConfigButton: React.FunctionComponent<LoadConfigButtonProps>;
    saveConfigButton: React.FunctionComponent<MongoData>;
    configButtonContainer: React.FunctionComponent<Empty>;
}

export interface ButtonProps
{
    disabled: boolean;
    onClick: () => void;
}

export interface SnackbarProps
{
    open: boolean;
    onClose: (event?: React.SyntheticEvent, reason?: string) => void;
    message: string;
}

interface Snackbar
{
    open: boolean;
    setOpen: (open: boolean) => void;
    message: string;
    setMessage: (message: string) => void;
    onClose: (event?: React.SyntheticEvent, reason?: string) => void;
}




export function MongoConfigurator<a>(
    props: Props<a>,
)
{
    const defaults: MongoData
        = fs.existsSync(configPath)
        ? readConfig(configPath, props)
        : props;

    const successSnackbar: Snackbar
        = getSnackbar();

    const errorSnackbar: Snackbar
        = getSnackbar();

    const [url, setUrl]
        = React.useState(defaults.url);

    const [moleculeKey, setMoleculeKey]
        = React.useState(defaults.moleculeKey);

    const [database, setDatabase]
        = React.useState(defaults.database);

    const [moleculeCollection, setMoleculeCollection]
        = React.useState(defaults.moleculeCollection);

    const [
        constructedMoleculeCollection,
        setConstructedMoleculeCollection,
    ]
        = React.useState(defaults.constructedMoleculeCollection);

    const [positionMatrixCollection, setPositionMatrixCollection]
        = React.useState(defaults.positionMatrixCollection);

    const [
        buildingBlockPositionMatrixCollection,
        setBuildingBlockPositionMatrixCollection,
    ]
        = React.useState(
            defaults.buildingBlockPositionMatrixCollection
        );

    const [numEntriesPerPage, setNumEntriesPerPage]
        = React.useState(defaults.numEntriesPerPage);

    const [selectBuildingBlocks, setSelectBuildingBlocks]
        = React.useState(defaults.selectBuildingBlocks);

    const [selectConstructedMolecules, setSelectConstructedMolecules]
        = React.useState(defaults.selectConstructedMolecules);

    const [showTwoD, setShowTwoD]
        = React.useState(defaults.twoDViewer);

    const [showThreeD, setShowThreeD]
        = React.useState(defaults.threeDViewer);


    return (
        <props.component>
            <props.configButtonContainer>
                    <props.saveConfigButton
                        url={url}
                        moleculeKey={moleculeKey}
                        database={database}
                        moleculeCollection={moleculeCollection}
                        constructedMoleculeCollection={
                            constructedMoleculeCollection
                        }
                        positionMatrixCollection={
                            positionMatrixCollection
                        }
                        buildingBlockPositionMatrixCollection={
                            buildingBlockPositionMatrixCollection
                        }
                        numEntriesPerPage={numEntriesPerPage}
                        selectBuildingBlocks={selectBuildingBlocks}
                        selectConstructedMolecules={
                            selectConstructedMolecules
                        }
                        twoDViewer={showTwoD}
                        threeDViewer={showThreeD}
                    />
                    <props.loadConfigButton
                        url={url}
                        moleculeKey={moleculeKey}
                        database={database}
                        moleculeCollection={moleculeCollection}
                        constructedMoleculeCollection={
                            constructedMoleculeCollection
                        }
                        positionMatrixCollection={
                            positionMatrixCollection
                        }
                        buildingBlockPositionMatrixCollection={
                            buildingBlockPositionMatrixCollection
                        }
                        numEntriesPerPage={numEntriesPerPage}
                        selectBuildingBlocks={selectBuildingBlocks}
                        selectConstructedMolecules={
                            selectConstructedMolecules
                        }
                        twoDViewer={showTwoD}
                        threeDViewer={showThreeD}
                        setUrl={setUrl}
                        setDatabase={setDatabase}
                        setMoleculeKey={setMoleculeKey}
                        setMoleculeCollection={setMoleculeCollection}
                        setConstructedMoleculeCollection={
                            setConstructedMoleculeCollection
                        }
                        setPositionMatrixCollection={
                            setPositionMatrixCollection
                        }
                        setBuildingBlockPositionMatrixCollection={
                            setBuildingBlockPositionMatrixCollection
                        }
                        setNumEntriesPerPage={setNumEntriesPerPage}
                        setSelectBuildingBlocks={
                            setSelectBuildingBlocks
                        }
                        setSelectConstructedMolecules={
                            setSelectConstructedMolecules
                        }
                        setTwoDViewer={setShowTwoD}
                        setThreeDViewer={setShowThreeD}
                    />
            </props.configButtonContainer>
            <props.inputFields
                url={ url }
                setUrl={ setUrl }

                moleculeKey={ moleculeKey }
                setMoleculeKey={ setMoleculeKey }

                database={ database }
                setDatabase={ setDatabase }

                moleculeCollection={ moleculeCollection }
                setMoleculeCollection={ setMoleculeCollection }

                constructedMoleculeCollection={
                    constructedMoleculeCollection
                }
                setConstructedMoleculeCollection={
                    setConstructedMoleculeCollection
                }

                positionMatrixCollection={ positionMatrixCollection }
                setPositionMatrixCollection={
                    setPositionMatrixCollection
                }

                buildingBlockPositionMatrixCollection={
                    buildingBlockPositionMatrixCollection
                }
                setBuildingBlockPositionMatrixCollection={
                    setBuildingBlockPositionMatrixCollection
                }

                numEntriesPerPage={ numEntriesPerPage }
                setNumEntriesPerPage={ setNumEntriesPerPage }

                selectBuildingBlocks={ selectBuildingBlocks }
                setSelectBuildingBlocks={ setSelectBuildingBlocks }

                selectConstructedMolecules={
                    selectConstructedMolecules
                }
                setSelectConstructedMolecules={
                    setSelectConstructedMolecules
                }

                showTwoD={showTwoD}
                setShowTwoD={setShowTwoD}

                showThreeD={showThreeD}
                setShowThreeD={setShowThreeD}
            />
            <Grid item>
                <props.button
                    disabled={
                        !selectConstructedMolecules
                        &&
                        !selectBuildingBlocks
                    }
                    onClick={() => {
                        const config: MongoData
                            = {
                                url,
                                moleculeKey,
                                database,
                                moleculeCollection,
                                constructedMoleculeCollection,
                                positionMatrixCollection,
                                buildingBlockPositionMatrixCollection,
                                numEntriesPerPage,
                                selectBuildingBlocks,
                                selectConstructedMolecules,
                                twoDViewer: showTwoD,
                                threeDViewer: showThreeD,
                            };

                        fs.writeFileSync(
                            configPath,
                            JSON.stringify(config),
                            'utf-8',
                        );
                        props.getMoleculesButton.onClick
                            ()
                            (props.dispatch)
                            ({
                                success: successSnackbar,
                                error: errorSnackbar,
                            })
                            (config);
                    }}
                />
                <props.successSnackbar
                    open={successSnackbar.open}
                    onClose={successSnackbar.onClose}
                    message={successSnackbar.message}
                />
                <props.errorSnackbar
                    open={errorSnackbar.open}
                    onClose={errorSnackbar.onClose}
                    message={errorSnackbar.message}
                />
            </Grid>
        </props.component>
    );
}

function getSnackbar(): Snackbar
{
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');

    const onClose = (event?: React.SyntheticEvent, reason?: string) =>
    {
        if (reason === 'clickaway')
        {
            return;
        }
        setOpen(false);
    };

    return {
        open,
        setOpen,
        message,
        setMessage,
        onClose,
    };
}
